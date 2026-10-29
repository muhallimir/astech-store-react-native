const TestRenderer = require('react-test-renderer');

// Shim createRoot for React 19 compatibility
// @testing-library/react-native v14 expects testRenderer.createRoot(container, options)
// But react-test-renderer 19 doesn't export createRoot directly

module.exports = {
  ...require('react-test-renderer'),
  createRoot: (container, options) => {
    let currentElement = null;
    
    return {
      render: (element) => {
        // Use TestRenderer.create which is the actual API
        const testRenderer = require('react-test-renderer');
        if (currentElement) {
          // Update existing tree
          testRenderer.act(() => {
            // TestRenderer doesn't have update, need to recreate
          });
        }
        return testRenderer.create(element, {
          createNodeMock: options?.createNodeMock,
        });
      },
      unmount: () => {
        // TestRenderer instances don't have explicit unmount
        // The instance is garbage collected
      },
    };
  },
};