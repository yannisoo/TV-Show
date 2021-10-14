import React from "react";
import { render, screen} from "@testing-library/react";

import { shallow } from 'enzyme';
import Home from "../components/home";

test('use jsdom in this test file', () => {
  const element = document.createElement('div');
  expect(element).not.toBeNull();
});

test("should display a blank search", async () => {
    render(<Home/>)

    const searchTitle = screen.getByTestId("search");
    expect(searchTitle).toHaveValue("");
});

// it('Test click event', () => {
//     const mockCallBack = jest.fn();

//     const button = shallow((<button onClick={mockCallBack}>Ok!</button>));
//     button.find('button').simulate('click');
//     expect(mockCallBack.mock.calls.length).toEqual(1);
//   });