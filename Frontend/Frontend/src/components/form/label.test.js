import { render, screen, cleanup } from "@testing-library/react";
import Label from './Label';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';

afterEach(() => cleanup());

describe('Label', () => {
  it('should render the label with correct text', () => {
    const labelText = 'Test Moca';
    render(<Label>{labelText}</Label>);
    const labelElement = screen.getByTestId('label');
    expect(labelElement).toHaveTextContent(labelText);
  });

  it('should label have general style', () => {
    const labelText = 'Test Moca';
    render(<Label>{labelText}</Label>);
    const labelElement = screen.getByTestId('label');
    expect(labelElement).toHaveStyle(`
      background-color: pink;
      color: white;
      border-radius: 100px;
      padding: 5px 10px;
      font-size: 24px;
      margin-block: 10px;
    `);
  });

  it('should label have custom style', () => {
    const customStyle = {
      backgroundColor: 'blue',
      color: 'yellow',
      fontSize: '20px',
    };
    render(<Label style={customStyle}>Test Moca</Label>);
    const labelElement = screen.getByTestId('label');
    expect(labelElement).toHaveStyle(`
      background-color: blue;
      color: yellow;
      border-radius: 100px;
      padding: 5px 10px;
      font-size: 20px;
      margin-block: 10px;
    `);
  });
});

