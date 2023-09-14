export const initView = (viewModel) => {
    const testDiv = document.querySelector("#test-div");
    viewModel.testProperty.bind((newVal) => (testDiv.textContent = newVal));
};
