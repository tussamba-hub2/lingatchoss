import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import ApexCharts from "apexcharts";
import { supabase } from "../../../supabaseClient.js";
import i18n from "../../i18n.js";

export default function Area() {
  const { t } = useTranslation();
  const chartRef = useRef(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [interactionsData, setInteractionsData] = useState({
    months: [],
    counts: [],
  });

  // Get current session
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setSession(session);
        loadInteractionsData(session.user.id);
      }
    });
  }, []);

  // Reload data when language changes
  useEffect(() => {
    if (session) {
      loadInteractionsData(session.user.id);
    }
  }, [i18n.language]);

  const loadInteractionsData = async (userId) => {
    try {
      setLoading(true);

      // Get current year
      const currentYear = new Date().getFullYear();
      const startOfYear = new Date(currentYear, 0, 1).toISOString();
      const endOfYear = new Date(currentYear, 11, 31, 23, 59, 59).toISOString();

      // Fetch interactions for the current year
      const { data, error } = await supabase
        .from("interactions")
        .select("created_at")
        .eq("company_id", userId)
        .gte("created_at", startOfYear)
        .lte("created_at", endOfYear);

      if (error) {
        console.error("Error fetching interactions:", error);
        return;
      }

      // Process data to group by month
      const monthlyData = processMonthlyData(data);
      setInteractionsData(monthlyData);
    } catch (err) {
      console.error("Error loading interactions data:", err);
    } finally {
      setLoading(false);
    }
  };

  const processMonthlyData = (interactions) => {
    // Get current language from i18n
    const currentLang = i18n.language || "pt";

    // Define month names based on language
    const monthNames = {
      pt: [
        "Jan",
        "Fev",
        "Mar",
        "Abr",
        "Mai",
        "Jun",
        "Jul",
        "Ago",
        "Set",
        "Out",
        "Nov",
        "Dez",
      ],
      en: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      fr: [
        "Jan",
        "Fév",
        "Mar",
        "Avr",
        "Mai",
        "Jun",
        "Juil",
        "Août",
        "Sep",
        "Oct",
        "Nov",
        "Déc",
      ],
      umb: [
        "Jan",
        "Fev",
        "Mar",
        "Abr",
        "Mai",
        "Jun",
        "Jul",
        "Ago",
        "Set",
        "Out",
        "Nov",
        "Dez",
      ],
    };

    const months = monthNames[currentLang] || monthNames.pt;
    const monthlyCounts = new Array(12).fill(0);

    interactions.forEach((interaction) => {
      const date = new Date(interaction.created_at);
      const month = date.getMonth(); // 0-11
      monthlyCounts[month]++;
    });

    return {
      months: months,
      counts: monthlyCounts,
    };
  };

  useEffect(() => {
    if (!loading && interactionsData.months.length > 0) {
      const options = {
        chart: {
          height: "250px",
          maxWidth: "100%",
          type: "area",
          fontFamily: "Inter, sans-serif",
          dropShadow: {
            enabled: false,
          },
          toolbar: {
            show: false,
          },
        },
        tooltip: {
          enabled: true,
          x: {
            show: false,
          },
        },
        fill: {
          type: "gradient",
          gradient: {
            opacityFrom: 0.55,
            opacityTo: 0,
            shade: "#1C64F2",
            gradientToColors: ["#1C64F2"],
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          width: 2,
        },
        grid: {
          show: false,
          strokeDashArray: 4,
          padding: {
            left: 2,
            right: 2,
            top: 0,
          },
        },
        series: [
          {
            name: t("interactions"),
            data: interactionsData.counts,
            color: "#1A56DB",
          },
        ],
        xaxis: {
          categories: interactionsData.months,
          labels: {
            show: true,
            style: {
              fontSize: "12px",
              colors: "#6B7280",
            },
          },
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
        },
        yaxis: {
          show: false,
        },
      };

      if (chartRef.current && typeof ApexCharts !== "undefined") {
        const chart = new ApexCharts(chartRef.current, options);
        chart.render();

        // Cleanup function to destroy chart when component unmounts
        return () => {
          chart.destroy();
        };
      }
    }
  }, [loading, interactionsData, t]);

  return (
    <div className="d-flex w-full area-chart">
      <div className="w-full">
        <div className="d-flex items-center justify-between p-16 br-bt">
          <h2 className="size-18 bold">{t("interactions")}</h2>
          <div className="d-flex items-center">
            <button className="btn btn-br">
              <span><i className="fi fi-rr-file-export"></i></span>
            </button>
          </div>
        </div>
        {loading ? (
          <div
            className="d-flex items-center justify-center"
            style={{ height: "280px" }}
          >
            <div className="loading-spinner"></div>
            <span className="ml-8">{t("loading")}</span>
          </div>
        ) : (
          <div id="area-chart" ref={chartRef} style={{ height: "280px" }}></div>
        )}
      </div>
    </div>
  );
}
