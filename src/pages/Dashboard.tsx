
import { PageHeader } from "@/components/common/PageHeader";

const Dashboard = () => {
  return (
    <div>
      <PageHeader 
        title="Dashboard" 
        subtitle="Overview of your invoice processing activities" 
      />
      
      <div className="flex items-center justify-center h-full min-h-[600px]">
        <div className="max-w-2xl w-full">
          <img 
            src="/lovable-uploads/bdd759df-31e5-4a2d-a76c-bdfbfdd299ff.png" 
            alt="Dashboard illustration showing charts, graphs and analytics with text about invoice sorting and time saving"
            className="w-full h-auto animate-fade-in"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
