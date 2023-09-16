export const initView = (viewModel) => {
    const testDiv = document.querySelector("#test-div");
    viewModel.allWeatherDataProperty.bind(
        (d) =>
            (testDiv.textContent = JSON.stringify(
                d.temperatures.map((d) => d.getValue())
            ))
    );
};
