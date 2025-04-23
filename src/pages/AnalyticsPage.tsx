
import { MobileLayout } from "@/components/mobile-layout/MobileLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

export default function AnalyticsPage() {
  // Mock data for waste reduction
  const wasteData = [
    { name: 'Jan', waste: 3.2 },
    { name: 'Feb', waste: 2.8 },
    { name: 'Mar', waste: 2.1 },
    { name: 'Apr', waste: 1.5 },
    { name: 'May', waste: 0.9 },
  ];

  // Mock data for food category distribution
  const categoryData = [
    { name: 'Vegetables', value: 35 },
    { name: 'Fruits', value: 25 },
    { name: 'Dairy', value: 20 },
    { name: 'Meat', value: 15 },
    { name: 'Grains', value: 5 },
  ];

  // Mock data for consumption patterns
  const consumptionData = [
    { name: 'Mon', consumed: 4, purchased: 3 },
    { name: 'Tue', consumed: 3, purchased: 1 },
    { name: 'Wed', consumed: 5, purchased: 2 },
    { name: 'Thu', consumed: 2, purchased: 4 },
    { name: 'Fri', consumed: 6, purchased: 3 },
    { name: 'Sat', consumed: 4, purchased: 5 },
    { name: 'Sun', consumed: 3, purchased: 2 },
  ];

  // Mock data for waste reasons
  const wasteReasonData = [
    { name: 'Expired', value: 45 },
    { name: 'Spoiled', value: 30 },
    { name: 'Overcooked', value: 15 },
    { name: 'Not Tasty', value: 10 },
  ];

  // Colors for charts
  const COLORS = ['#4CAF50', '#81C784', '#C8E6C9', '#E8F5E9', '#F1F8E9'];
  const WASTE_COLORS = ['#FF5252', '#FF8A80', '#FFCDD2', '#FFEBEE'];

  return (
    <MobileLayout title="Analytics">
      <div className="p-4 space-y-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Food Waste Reduction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-2">
              <span className="text-2xl font-bold text-primary">72%</span>
              <span className="text-sm text-muted-foreground ml-1">less waste</span>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={wasteData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="waste" stroke="#4CAF50" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Inventory Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Weekly Consumption</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={consumptionData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="consumed" fill="#4CAF50" name="Consumed" />
                <Bar dataKey="purchased" fill="#FF9800" name="Purchased" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Waste Reasons</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={wasteReasonData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {wasteReasonData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={WASTE_COLORS[index % WASTE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </MobileLayout>
  );
}
