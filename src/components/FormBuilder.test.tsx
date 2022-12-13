import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../app/store";
import FormBuilder from "./FormBuilder";
import config from "../form-data.json";

it("should render text field, dropdown and submit button", () => {
  render(
    <Provider store={store}>
      <FormBuilder configJson={config} />
    </Provider>
  );

  expect(screen.getByRole("combobox")).toBeInTheDocument();
  expect(screen.getByRole("textbox")).toBeInTheDocument();
  expect(screen.getByRole("button")).toBeInTheDocument();
});
