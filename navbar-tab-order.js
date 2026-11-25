(() => {
  const installed = Symbol.for('owly.docs.navbarTabOrder');
  if (document[installed]) return;
  document[installed] = true;

  const toolbarSelector = '#navbar div:has(> div > div > #localization-select-trigger)';
  let pendingEntry;

  // Mintlify can stop Shift+Tab from bubbling when a menu is open.
  document.addEventListener('keydown', (event) => {
    pendingEntry = undefined;
    if (event.key !== 'Tab' || event.defaultPrevented || event.isComposing ||
        event.altKey || event.ctrlKey || event.metaKey) return;

    const toolbar = document.querySelector(toolbarSelector);
    if (!toolbar) return;

    const controls = Array.from(toolbar.querySelectorAll('a[href], button:enabled'))
      .filter((control) => control.tabIndex >= 0 && control.getClientRects().length &&
        getComputedStyle(control).visibility === 'visible');
    if (!controls.length) return;

    // CSS places the controls in a different order from Mintlify's markup.
    const visualOrder = controls
      .map((control) => ({ control, left: control.getBoundingClientRect().left }))
      .sort((a, b) => a.left - b.left)
      .map(({ control }) => control);
    const direction = event.shiftKey ? -1 : 1;
    const expanded = controls.find((control) => control.getAttribute('aria-expanded') === 'true');
    if (expanded) {
      const popup = document.getElementById(expanded.getAttribute('aria-controls'));
      if (expanded.matches('#localization-select-trigger, #theme-preference-menu-trigger') &&
          (event.target === expanded || popup?.contains(event.target))) {
        const next = visualOrder[visualOrder.indexOf(expanded) + direction];
        // Let Mintlify close its menu before moving to the visual neighbor.
        requestAnimationFrame(() => {
          if (next?.isConnected && expanded.getAttribute('aria-expanded') === 'false') {
            next.focus({ preventScroll: true });
          }
        });
      }
      return;
    }

    const index = visualOrder.indexOf(event.target);

    if (index === -1) {
      const edge = event.shiftKey ? -1 : 0;
      const from = controls.at(edge);
      const to = visualOrder.at(edge);
      if (from === to) return;

      const entry = { event, from, to };
      pendingEntry = entry;
      setTimeout(() => {
        if (pendingEntry === entry) pendingEntry = undefined;
      }, 0);
      return;
    }

    const next = visualOrder[index + direction];
    if (next) {
      event.preventDefault();
      next.focus({ preventScroll: true });
      return;
    }

    // Use the source-order edge so the browser can Tab out of the toolbar.
    const sourceEdge = controls.at(event.shiftKey ? 0 : -1);
    if (sourceEdge !== event.target) sourceEdge.focus({ preventScroll: true });
  }, { capture: true });

  document.addEventListener('focusin', (event) => {
    const entry = pendingEntry;
    pendingEntry = undefined;
    if (entry && !entry.event.defaultPrevented && event.target === entry.from) {
      entry.to.focus({ preventScroll: true });
    }
  });
})();
