import React, { useState, useEffect } from "react";

interface Stat {
  label: string;
  value: number;
  suffix: string;
  icon: string;
}

const StatsCounter: React.FC = () => {
  const [stats, setStats] = useState<Stat[]>([
    { label: "Reportes Hoy", value: 0, suffix: "", icon: "📊" },
    { label: "Usuarios Activos", value: 0, suffix: "K+", icon: "👥" },
    { label: "Rutas Seguras", value: 0, suffix: "+", icon: "🛡️" },
    { label: "Tiempo Resp.", value: 0, suffix: "s", icon: "⚡" },
  ]);

  const finalValues = [127, 50, 1250, 3];

  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prevStats) =>
        prevStats.map((stat, index) => {
          const targetValue = finalValues[index];
          const increment = Math.ceil(targetValue / 50);
          const newValue = Math.min(stat.value + increment, targetValue);

          return { ...stat, value: newValue };
        })
      );
    }, 100);

    // Clear interval when all stats reach their target
    const allComplete = stats.every(
      (stat, index) => stat.value >= finalValues[index]
    );
    if (allComplete) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [stats]);

  // Simulate real-time updates after initial animation
  useEffect(() => {
    const updateInterval = setInterval(() => {
      setStats((prevStats) => {
        const newStats = [...prevStats];
        // Randomly update the "Reportes Hoy" stat
        if (Math.random() > 0.7) {
          newStats[0] = { ...newStats[0], value: newStats[0].value + 1 };
        }
        return newStats;
      });
    }, 5000);

    return () => clearInterval(updateInterval);
  }, []);
  return (
    <div className="flex justify-center items-center h-full w-full">
      {/* Contador principal con animación */}
      <div className="text-center">
        <div className="text-4xl lg:text-5xl font-bold mb-2">
          {stats[0].value}
          {stats[0].suffix}
        </div>
      </div>
    </div>
  );
};

export default StatsCounter;
