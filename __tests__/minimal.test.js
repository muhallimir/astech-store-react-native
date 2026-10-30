import React from 'react';
import { Text } from 'react-native';
import renderer from 'react-test-renderer';

describe('minimal', () => {
  test('renders', () => {
    const tree = renderer.create(<Text>Hello</Text>).toJSON();
    console.log('TREE:', JSON.stringify(tree));
  });
});
