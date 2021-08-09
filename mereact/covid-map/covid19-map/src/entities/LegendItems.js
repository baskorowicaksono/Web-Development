import LegendItem from "./LegendItem"

const legendItems = [
    new LegendItem(
        "1.000.000 +",
        "#cc222b",
        (cases) => cases >= 1_000_000,
        "white"
    ),
    new LegendItem(
        "500.000 - 999.999",
        "#f15b4c",
        (cases) => cases >= 500_000 && cases < 1_000_000,
        "white"
    ),
    new LegendItem(
        "200.000 - 499.999",
        "#faa41b",
        (cases) => cases >= 200_000 && cases < 500_000
    ),
    new LegendItem(
        "50.000 - 199.999",
        "#ffd45b",
        (cases) => cases >= 50_000 && cases < 200_000
    ),
    new LegendItem(
        "0 - 49.999",
        "#7ba591",
        (cases) => cases > 0 && cases < 50_000
    ),
    new LegendItem(
        "No Data",
        "#fff",
        (cases) => true
    )
];


export default legendItems;