import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { supabase } from "../../../supabaseClient.js";

export default function Cards() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    interactions: { current: 0, previous: 0, percentage: 0 },
    services: { current: 0, previous: 0, percentage: 0 },
    categories: { current: 0, previous: 0, percentage: 0 },
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);

      // Get current session
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) return;

      const userId = session.user.id;

      // Get current and previous month dates
      const now = new Date();
      const currentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const previousMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

      // Load interactions stats
      const interactionsStats = await loadInteractionsStats(
        userId,
        currentMonth,
        previousMonth,
        nextMonth
      );

      // Load services stats
      const servicesStats = await loadServicesStats(
        userId,
        currentMonth,
        previousMonth,
        nextMonth
      );

      // Load categories stats
      const categoriesStats = await loadCategoriesStats(
        userId,
        currentMonth,
        previousMonth,
        nextMonth
      );

      setStats({
        interactions: interactionsStats,
        services: servicesStats,
        categories: categoriesStats,
      });
    } catch (error) {
      console.error("Error loading stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadInteractionsStats = async (
    userId,
    currentMonth,
    previousMonth,
    nextMonth
  ) => {
    // Current month interactions
    const { count: currentCount } = await supabase
      .from("interactions")
      .select("*", { count: "exact", head: true })
      .eq("company_id", userId)
      .gte("created_at", currentMonth.toISOString())
      .lt("created_at", nextMonth.toISOString());

    // Previous month interactions
    const { count: previousCount } = await supabase
      .from("interactions")
      .select("*", { count: "exact", head: true })
      .eq("company_id", userId)
      .gte("created_at", previousMonth.toISOString())
      .lt("created_at", currentMonth.toISOString());

    const percentage = calculatePercentageChange(
      previousCount || 0,
      currentCount || 0
    );

    return {
      current: currentCount || 0,
      previous: previousCount || 0,
      percentage: percentage,
    };
  };

  const loadServicesStats = async (
    userId,
    currentMonth,
    previousMonth,
    nextMonth
  ) => {
    // Current month services
    const { count: currentCount } = await supabase
      .from("services")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId)
      .gte("created_at", currentMonth.toISOString())
      .lt("created_at", nextMonth.toISOString());

    // Previous month services
    const { count: previousCount } = await supabase
      .from("services")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId)
      .gte("created_at", previousMonth.toISOString())
      .lt("created_at", currentMonth.toISOString());

    const percentage = calculatePercentageChange(
      previousCount || 0,
      currentCount || 0
    );

    return {
      current: currentCount || 0,
      previous: previousCount || 0,
      percentage: percentage,
    };
  };

  const loadCategoriesStats = async (
    userId,
    currentMonth,
    previousMonth,
    nextMonth
  ) => {
    // Current month categories
    const { count: currentCount } = await supabase
      .from("categories")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId)
      .gte("created_at", currentMonth.toISOString())
      .lt("created_at", nextMonth.toISOString());

    // Previous month categories
    const { count: previousCount } = await supabase
      .from("categories")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId)
      .gte("created_at", previousMonth.toISOString())
      .lt("created_at", currentMonth.toISOString());

    const percentage = calculatePercentageChange(
      previousCount || 0,
      currentCount || 0
    );

    return {
      current: currentCount || 0,
      previous: previousCount || 0,
      percentage: percentage,
    };
  };

  const calculatePercentageChange = (previous, current) => {
    if (previous === 0) {
      return current > 0 ? 100 : 0;
    }
    return Math.round(((current - previous) / previous) * 100);
  };

  const formatPercentageText = (percentage) => {
    if (percentage === 0) return t("no_change");
    const sign = percentage > 0 ? "+" : "";
    return `${sign}${percentage}% ${t("compared_to_last_month")}`;
  };

  if (loading) {
    return (
      <div className="cards-area">
        <div className="card d-flex column g-20px">
          <div
            className="d-flex items-center justify-center"
            style={{ height: "100px" }}
          >
            <div className="loading-spinner"></div>
          </div>
        </div>
        <div className="card d-flex column g-20px">
          <div
            className="d-flex items-center justify-center"
            style={{ height: "100px" }}
          >
            <div className="loading-spinner"></div>
          </div>
        </div>
        <div className="card d-flex column g-20px">
          <div
            className="d-flex items-center justify-center"
            style={{ height: "100px" }}
          >
            <div className="loading-spinner"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cards-area">
      <NavLink to="/" className="card d-flex column g-20px">
        <div className="d-flex column g-4px">
          <h4 className="size-16 medium">{t("interactions")}</h4>
        </div>
        <div className="d-flex column g-4px">
          <h3 className="size-24 bold">
            {stats.interactions.current.toLocaleString()}
          </h3>
          <span className="size-12">
            {formatPercentageText(stats.interactions.percentage)}
          </span>
        </div>
      </NavLink>
      <NavLink to="/" className="card d-flex column g-20px">
        <div className="d-flex column g-4px">
          <h4 className="size-16 medium">{t("services")}</h4>
        </div>
        <div className="d-flex column g-4px">
          <h3 className="size-24 bold">
            {stats.services.current.toLocaleString()}
          </h3>
          <span className="size-12">
            {formatPercentageText(stats.services.percentage)}
          </span>
        </div>
      </NavLink>
      <NavLink to="/" className="card d-flex column g-20px">
        <div className="d-flex column g-4px">
          <h4 className="size-16 medium">{t("all_categories")}</h4>
        </div>
        <div className="d-flex column g-4px">
          <h3 className="size-24 bold">
            {stats.categories.current.toLocaleString()}
          </h3>
          <span className="size-12">
            {formatPercentageText(stats.categories.percentage)}
          </span>
        </div>
      </NavLink>
    </div>
  );
}
