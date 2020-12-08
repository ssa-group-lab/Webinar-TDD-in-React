import React from "react";
import { render, screen, fireEvent, findAllByRole, getByRole, getByText } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Dropdown from "./Dropdown";

const ITEMS = [
    { id: 0, text: "First item" },
    { id: 1, text: "Second item" },
    { id: 2, text: "Third item" },
];


test("should render without errors", () => {
  const { container } = render(<Dropdown />);

  expect(container.firstChild).toHaveClass("dropdown");
});

test("should show a default text in the caption by default", () => {
  render(<Dropdown />);

  const caption = screen.getByRole("button");
  expect(caption).toHaveTextContent("Click here to open the dropdown");
  expect(caption).toHaveClass("dropdown__caption");
});

// TODO: won't fail
test("should have the list hidden by default", () => {
  render(<Dropdown />);

  const list = screen.queryByRole("list");
  expect(list).not.toBeInTheDocument();
});

/* ===  LIST === */
test("should show the list when the caption is clicked", async () => {
  render(<Dropdown items={ITEMS} />);

  const caption = screen.getByRole("button");
  fireEvent.click(caption);

  const list = await screen.findByRole("list");
  expect(list).toHaveClass("dropdown__list");
});

test("should render list items passed in via props", async () => {
  render(<Dropdown items={ITEMS} />);

  const caption = screen.getByRole("button");
  fireEvent.click(caption);

  const list = await screen.findByRole("list");

  const items = await findAllByRole(list, "listitem");

  expect(items.length).toEqual(ITEMS.length);

  items.forEach((item, index) => {
    expect(item).toHaveClass("dropdown__listitem");

    const btn = getByRole(item, "button");

    expect(btn).toHaveClass("dropdown__listbutton");
    expect(btn).toHaveTextContent(ITEMS[index].text);
  });
});

/* === LIST: click outside === */
test("should hide the list when clicked outside the dropdown", async () => {
  render(<Dropdown items={ITEMS} />);

  const caption = screen.getByRole("button");
  fireEvent.click(caption);

  await screen.findByRole("list");

  fireEvent.click(document);
  expect(screen.queryByRole("list")).not.toBeInTheDocument();
});

// TODO
test.todo("should not show up the hidden list when clicked outside");
test.todo("should not hide the list when clicked on the caption");

/* ===  LIST: item selection === */
test("should highlight a selected item", async () => {
  render(<Dropdown items={ITEMS} onSelect={() => {}} />);

  const caption = screen.getByRole("button");
  fireEvent.click(caption);

  const btn = screen.getByText(ITEMS[0].text);
  expect(btn).not.toHaveClass("dropdown__listbuton--selected");

  fireEvent.click(btn);
  fireEvent.click(caption);

  const list = screen.getByRole("list");
  expect(getByText(list, ITEMS[0].text)).toHaveClass(
    "dropdown__listbutton",
    "dropdown__listbutton--selected"
  );
});

test("should show text of the selected item in the caption", () => {
  render(<Dropdown items={ITEMS} onSelect={() => {}} />);

  const caption = screen.getByRole("button");
  fireEvent.click(caption);

  const btn = screen.getByText(ITEMS[0].text);

  fireEvent.click(btn);

  expect(caption).toHaveTextContent(ITEMS[0].text);
});

test('should call "onSelect" when a not selected item is clicked', () => {
  const onSelect = jest.fn();
  render(<Dropdown items={ITEMS} onSelect={onSelect} />);


  const caption = screen.getByRole("button");
  fireEvent.click(caption);

  const btn = screen.getByText(ITEMS[0].text);

  fireEvent.click(btn);

  expect(onSelect).toHaveBeenCalledTimes(1);
  expect(onSelect).toHaveBeenCalledWith(ITEMS[0]);
});
test("should close the list when an item gets clicked", async () => {
  const onSelect = jest.fn();
  render(<Dropdown items={ITEMS} onSelect={onSelect} />);

  const caption = screen.getByRole("button");
  fireEvent.click(caption);

  const btn = screen.getByText(ITEMS[0].text);

  fireEvent.click(btn);

  const list = screen.queryByRole("list");
  expect(list).not.toBeInTheDocument();
});

// NOTE: эти 2 теста будут успешными
test.todo("should un-highlight a selected item when another item is clicked");

test.todo("should not toggle selection when the item is clicked again");

/* === PROPS === */
test.todo('should throw an error when "onSelect" is not passed');
test.todo('should throw an error when "onSelect" is not a function');
test.todo('should throw an error when "items" is not passed');
test.todo('should throw an error when "items" is not an array of objects');

/* === MISC === */
test.todo(
  'should return into the default state when re-rendered with new "items"'
);
test.todo('should show "No items" when the "items" array is empty');
test.todo("should remove event listeners when unmounted");
