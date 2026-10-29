const TestRenderer = require('react-test-renderer');

// Shim for @testing-library/react-native v14 with React 19
// @testing-library/react-native calls testRenderer.createRoot(container, options)
// which should return an object with .render(element) and .unmount() methods
// The .render() should return a test renderer instance that @testing-library can add query methods to

module.exports = {
  ...TestRenderer,
  
  // @testing-library/react-native calls this
  createRoot: (container, options) => {
    let testRendererInstance = null;
    
    return {
      render: (element) => {
        // Create the test renderer instance
        testRendererInstance = TestRenderer.create(element, {
          createNodeMock: options?.createNodeMock,
        });
        // Return the test renderer instance so @testing-library can add query methods
        return testRendererInstance;
      },
      unmount: () => {
        if (testRendererInstance) {
          testRendererInstance.unmount();
        }
      },
    };
  },
  
  act: TestRenderer.act,
  create: TestRenderer.create,
};