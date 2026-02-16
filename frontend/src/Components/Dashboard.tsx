import { useEffect, useState } from "react";
import { Users, Package, Tags, ShoppingCart } from "lucide-react";
import { Row, Col, Card } from "react-bootstrap";
import { PieChart, Pie, Cell, Tooltip, Legend, LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { color, motion } from "framer-motion"; // adjust path
import { AuthService } from "../Services/AuthService.ts";
import { ProductService } from "../Services/ProductService.ts";
import { CategoryService } from "../Services/CategoryService.ts";
import { OrderService } from "../Services/OrderService.ts";
import { DailySalesDto } from "../Interfaces/Order/DailySalesDto.ts";
import { ProductAndCategory } from "../Interfaces/Product/ProductAndCategory.ts";

interface DailySalesChart extends DailySalesDto {
  dateLabel: string;
}

export default function Dashboard() {
  const [users, setUsers] = useState(0);
  const [products, setProducts] = useState(0);
  const [categories, setCategories] = useState(0);
  const [orders, setOrders] = useState(0);

  const [dailySales, setDailySales] = useState<DailySalesChart[]>([]);
  const [productsByCategory, setProductsByCategory] = useState<ProductAndCategory[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);

      const [u, p, c, o, sales, byCat] = await Promise.all([
        AuthService.CountUsers(),
        ProductService.CountProducts(),
        CategoryService.CountCategories(),
        OrderService.CountOrders(),
        OrderService.GetDailySalesAsync(),
        ProductService.GetProductCountByCategoryAsync(),
      ]);

      setUsers(u);
      setProducts(p);
      setCategories(c);
      setOrders(o);

     const mappedSales: DailySalesChart[] = sales.map((x) => {
  const parsedDate = new Date(x.date); // x.date duhet të jetë një string ose timestamp i vlefshëm
  const dateLabel = isNaN(parsedDate.getTime()) 
    ? String(x.date)  // në rast se nuk është datë valide, e konverton si string
    : parsedDate.toLocaleDateString("en-GB"); // gjithmonë string
  return {
    ...x,
    dateLabel, // kjo është STRING
  };
});

      setDailySales(mappedSales);
      setProductsByCategory(byCat);
    } catch (err) {
      console.error(err);
      setError("Error loading dashboard data");
    } finally {
      setLoading(false);
    }
  };
  console.log(dailySales);

  const statCards = [
    { title: "Users", value: users, icon: Users },
    { title: "Products", value: products, icon: Package },
    { title: "Categories", value: categories, icon: Tags },
    { title: "Orders", value: orders, icon: ShoppingCart },
  ];

   const cardColors = ["#4ade80", "#60a5fa", "#fbbf24", "#f472b6"];
   const pieColors = ["#4ade80", "#60a5fa", "#fbbf24", "#f472b6", "#a78bfa", "#f87171"];
   
  if (loading) return <div className="p-6">Loading dashboard...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="p-6 space-y-6">

      {/* STAT CARDS */}
 <Row className="mb-4">
  {statCards.map((card, i) => {
    const Icon = card.icon;
    return (
      <Col md={3} sm={6} key={card.title} className="mb-3">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
          <Card className="shadow-sm h-100" style={{ borderTop: `4px solid ${cardColors[i % cardColors.length]}` }}>
            <Card.Body className="d-flex justify-content-between align-items-center">
              <div>
                <div className="text-muted">{card.title}</div>
                <div className="fs-4 fw-bold">{card.value}</div>
              </div>
              <Icon size={28} color={cardColors[i % cardColors.length]} />
            </Card.Body>
          </Card>
        </motion.div>
      </Col>
    );
  })}
</Row>

<Row className="mb-4">
  <Col md={6} className="mb-3">
    <Card className="rounded-2xl shadow">
      <Card.Body className="p-4">
        <h2 className="text-lg font-semibold mb-4">Products by Category</h2>
        <div style={{ width: "100%", height: 320 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={productsByCategory}
                dataKey="numberOfProducts"
                nameKey="categoryName"
                cx="50%"
                cy="50%"
                outerRadius={110}
                label
              >
                {productsByCategory.map((_, index) => (
                  <Cell key={index} fill={pieColors[index % pieColors.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card.Body>
    </Card>
  </Col>

  <Col md={6} className="mb-3">
    <Card className="rounded-2xl shadow">
      <Card.Body className="p-4">
        <h2 className="text-lg font-semibold mb-4">Daily Orders</h2>
        <div style={{ width: "100%", height: 320 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dailySales}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="dateLabel" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="ordersCount" name="Orders" stroke="#60a5fa" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card.Body>
    </Card>
  </Col>
</Row>
      </div>
  );
}
