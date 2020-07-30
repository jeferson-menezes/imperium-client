export default {
    chart: {
        height: 200,
        type: "line",
        zoom: {
            enabled: false
        }
    },
    grid: {
        padding: {
            left: 30,
            right: 30
        }
    },
    stroke: {
        width: [7, 7],
        curve: "smooth"
    },
    title: {
        text: "Receitas e despesas",
        align: "center",
        style: {
            fontSize: "16px",
            color: "#666"
        }
    },
    fill: {
        type: "solid",
        opacity: 0.5
    },
    colors: ["#1bff49", "#ff1b1b"],
    markers: {
        size: 4,
        colors: ["#1bff49", "#ff1b1b"],
        strokeColors: "#fff",
        strokeWidth: 2,
        hover: {
            size: 7
        }
    },
    xaxis: {
        type: "datetime",
        labels: {
            datetimeFormatter: {
                year: "yyyy",
                month: "MMM 'yy",
                day: "dd MMM",
                hour: "HH:mm"
            }
        }
    }
}
