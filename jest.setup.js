// Mock @react-navigation/native completely
jest.mock('@react-navigation/native', () => {
  const React = require('react');
  
  const NavigationContext = React.createContext({
    navigate: jest.fn(),
    goBack: jest.fn(),
    dispatch: jest.fn(),
    setOptions: jest.fn(),
    isFocused: () => true,
    canGoBack: () => false,
    getParent: jest.fn(),
    getState: jest.fn(),
    setParams: jest.fn(),
  });
  
  return {
    NavigationContainer: ({ children }) => (
      <NavigationContext.Provider value={{
        navigate: jest.fn(),
        goBack: jest.fn(),
        dispatch: jest.fn(),
        setOptions: jest.fn(),
        isFocused: () => true,
        canGoBack: () => false,
        getParent: jest.fn(),
        getState: jest.fn(),
        setParams: jest.fn(),
      }}>
        {children}
      </NavigationContext.Provider>
    ),
    useNavigation: () => ({
      navigate: jest.fn(),
      goBack: jest.fn(),
      dispatch: jest.fn(),
      setOptions: jest.fn(),
      isFocused: () => true,
      canGoBack: () => false,
      getParent: jest.fn(),
      getState: jest.fn(),
      setParams: jest.fn(),
    }),
    useRoute: () => ({ params: {} }),
    useFocusEffect: (callback) => {},
  };
});

// Mock react-native-gesture-handler
jest.mock('react-native-gesture-handler', () => {
  const View = require('react-native').View;
  return { PanGestureHandler: View, TapGestureHandler: View, State: {} };
});

// Mock redux
jest.mock('react-redux', () => {
  const React = require('react');
  
  // Mock store
  const mockStore = {
    getState: () => ({
      productList: {
        loading: false,
        error: null,
        products: [
          { _id: 1, name: 'Acer Nitro 5', category: 'Electronics', price: 875.05 },
          { _id: 2, name: 'Acer Predator Helios', category: 'Electronics', price: 1325.29 },
          { _id: 3, name: 'Adidas Premium Pants', category: 'Pants', price: 150.0 },
          { _id: 4, name: 'Adidas Stripe Shirt', category: 'Shirts', price: 140.0 },
          { _id: 5, name: 'ASUS ROG Strix Scar 15', category: 'Electronics', price: 799.59 },
        ],
      },
    }),
    subscribe: jest.fn(),
    dispatch: jest.fn(),
    replaceReducer: jest.fn(),
  };
  
  const ReactReduxContext = require('react').createContext(null);
  
  return {
    useDispatch: () => jest.fn(),
    useSelector: (selector) => selector({
      productList: {
        loading: false,
        error: null,
        products: [
          { _id: 1, name: 'Acer Nitro 5', category: 'Electronics', price: 875.05 },
          { _id: 2, name: 'Acer Predator Helios', category: 'Electronics', price: 1325.29 },
          { _id: 3, name: 'Adidas Premium Pants', category: 'Pants', price: 150.0 },
          { _id: 4, name: 'Adidas Stripe Shirt', category: 'Shirts', price: 140.0 },
          { _id: 5, name: 'ASUS ROG Strix Scar 15', category: 'Electronics', price: 799.59 },
        ],
      },
    }),
    useStore: () => ({
      getState: () => ({
        productList: {
          loading: false,
          error: null,
          products: [
            { _id: 1, name: 'Acer Nitro 5', category: 'Electronics', price: 875.05 },
            { _id: 2, name: 'Acer Predator Helios', category: 'Electronics', price: 1325.29 },
            { _id: 3, name: 'Adidas Premium Pants', category: 'Pants', price: 150.0 },
            { _id: 4, name: 'Adidas Stripe Shirt', category: 'Shirts', price: 140.0 },
            { _id: 5, name: 'ASUS ROG Strix Scar 15', category: 'Electronics', price: 799.59 },
          ],
        },
      }),
      subscribe: jest.fn(),
      dispatch: jest.fn(),
      replaceReducer: jest.fn(),
    }),
    Provider: ({ children }) => (
      <ReactReduxContext.Provider value={{
        getState: () => ({
          productList: {
            loading: false,
            error: null,
            products: [
              { _id: 1, name: 'Acer Nitro 5', category: 'Electronics', price: 875.05 },
              { _id: 2, name: 'Acer Predator Helios', category: 'Electronics', price: 1325.29 },
              { _id: 3, name: 'Adidas Premium Pants', category: 'Pants', price: 150.0 },
              { _id: 4, name: 'Adidas Stripe Shirt', category: 'Shirts', price: 140.0 },
              { _id: 5, name: 'ASUS ROG Strix Scar 15', category: 'Electronics', price: 799.59 },
            ],
          },
        },
        subscribe: jest.fn(),
        dispatch: jest.fn(),
        replaceReducer: jest.fn(),
      }}>
        {children}
      </ReactReduxContext.Provider>
    ),
    useDispatch: () => jest.fn(),
    useSelector: (selector) => selector({
      productList: {
        loading: false,
        error: null,
        products: [
          { _id: 1, name: 'Acer Nitro 5', category: 'Electronics', price: 875.05 },
          { _id: 2, name: 'Acer Predator Helios', category: 'Electronics', price: 1325.29 },
          { _id: 3, name: 'Adidas Premium Pants', category: 'Pants', price: 150.0 },
          { _id: 4, name: 'Adidas Stripe Shirt', category: 'Shirts', price: 140.0 },
          { _id: 5, name: 'ASUS ROG Strix Scar 15', category: 'Electronics', price: 799.59 },
        ],
      },
    }),
    useStore: () => ({
      getState: () => ({
        productList: {
          loading: false,
          error: null,
          products: [
            { _id: 1, name: 'Acer Nitro 5', category: 'Electronics', price: 875.05 },
            { _id: 2, name: 'Acer Predator Helios', category: 'Electronics', price: 1325.29 },
            { _id: 3, name: 'Adidas Premium Pants', category: 'Pants', price: 150.0 },
            { _id: 4, name: 'Adidas Stripe Shirt', category: 'Shirts', price: 140.0 },
            { _id: 5, name: 'ASUS ROG Strix Scar 15', category: 'Electronics', price: 799.59 },
          ],
        },
      }),
      subscribe: jest.fn(),
      dispatch: jest.fn(),
      replaceReducer: jest.fn(),
    }),
  };
});

// Mock react-native-gesture-handler
jest.mock('react-native-gesture-handler', () => {
  const View = require('react-native').View;
  return { PanGestureHandler: View, TapGestureHandler: View, State: {} };
});