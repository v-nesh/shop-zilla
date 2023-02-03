import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Card from "../card/Card";
import { Bar } from "react-chartjs-2";
import styles from "./Chart.module.scss";
import { selectOrderHistory } from "../../redux/slice/orderSlice";
import { useSelector } from "react-redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: false,
      text: " Bar Chart",
    },
  },
};

const Chart = () => {
  const orders = useSelector(selectOrderHistory);

  const array = [];
  orders.map((item) => {
    const { orderStatus } = item;
    array.push(orderStatus);
  });

  const getOrderCount = (arr, value) => {
    return arr.filter((n) => n === value).length;
  };

  const [q1, q2, q3, q4] = [
    "order placed",
    "Processing",
    "shipped",
    "delivered",
  ];

  const placed = getOrderCount(array, q1);
  const processing = getOrderCount(array, q2);
  const shipped = getOrderCount(array, q3);
  const delivered = getOrderCount(array, q4);

  const data = {
    labels: ["Placed Orders", "Processing", "Shipped", "delivered"],

    datasets: [
      {
        label: "Order Count",
        data: [placed, processing, shipped, delivered],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <div className={styles.charts}>
      <Card className={styles.card}>
        <h3>Order Status Chart</h3>
        <Bar options={options} data={data} />;
      </Card>
    </div>
  );
};

export default Chart;
