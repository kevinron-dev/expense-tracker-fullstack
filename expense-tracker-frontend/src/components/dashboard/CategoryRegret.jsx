import React, { useEffect, useState } from "react";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Skeleton } from "primereact/skeleton";
import {
  getCategoryRegretByUser,
  getWorstCategoryByUser,
  getBestCategoryByUser,
} from "../../services/api";

const CategoryRegret = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [worstCategory, setWorstCategory] = useState("");
  const [bestCategory, setBestCategory] = useState("");
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("userId");
  useEffect(() => {
    const fetchCategoryData = async () => {
      if (!userId) return;

      try {
        let categories = [];
        let worst = "N/A";
        let best = "N/A";

        try {
          const value = await getCategoryRegretByUser(userId);
          if (Array.isArray(value)) {
            categories = value;
          }
        } catch {
          categories = [];
        }

        try {
          const value = await getWorstCategoryByUser(userId);
          worst = value || "N/A";
        } catch {
          worst = "N/A";
        }

        try {
          const value = await getBestCategoryByUser(userId);
          best = value || "N/A";
        } catch {
          best = "N/A";
        }

        const formattedData = [];
        for (let i = 0; i < categories.length; i += 1) {
          const item = categories[i];
          formattedData.push({
            category: item[0],
            regretCount: item[1],
            totalCount: item[2],
            regretPercentage: item[3]?.toFixed(2) || 0,
          });
        }

        setCategoryData(formattedData);
        setWorstCategory(worst);
        setBestCategory(best);
      } catch (error) {
        console.error("Error fetching category data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryData();
  }, [userId]);

  const percentageTemplate = (rowData) => {
    return <span className="font-bold">{rowData.regretPercentage}%</span>;
  };

  return (
    <div>
      <div className="analysis-grid">
        <div className="analysis-tile analysis-tile--worst">
          <div style={{ color: "#ff8a80", marginBottom: "1rem", fontSize: "1.1rem" }}>
            <i className="pi pi-exclamation-triangle mr-2"></i>
            Worst Category
          </div>

          {loading ? (
            <Skeleton width="10rem" height="2rem" />
          ) : (
            <h2 style={{ fontSize: "2.2rem", fontWeight: "700", margin: 0 }}>
              {worstCategory || "N/A"}
            </h2>
          )}
        </div>

        <div className="analysis-tile analysis-tile--best">
          <div style={{ color: "#4dd0e1", marginBottom: "1rem", fontSize: "1.1rem" }}>
            <i className="pi pi-check-circle mr-2"></i>
            Best Category
          </div>

          {loading ? (
            <Skeleton width="10rem" height="2rem" />
          ) : (
            <h2 style={{ fontSize: "2.2rem", fontWeight: "700", margin: 0 }}>
              {bestCategory || "N/A"}
            </h2>
          )}
        </div>
      </div>

      <Card
        style={{ padding: "1.5rem" }}
        title={
          <h2 style={{ fontSize: "1.6rem", margin: 0 }}>
            Category-wise Analysis
          </h2>
        }
      >
        {loading ? (
          <>
            <Skeleton className="mb-3" height="3rem" />
            <Skeleton className="mb-3" height="3rem" />
            <Skeleton className="mb-3" height="3rem" />
          </>
        ) : categoryData.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "3rem",
              color: "#a0a0a0"
            }}
          >
            <i
              className="pi pi-inbox"
              style={{ fontSize: "3rem", marginBottom: "1rem" }}
            ></i>
            <p style={{ fontSize: "1.1rem" }}>
              No expense data available yet. Start tracking your expenses!
            </p>
          </div>
        ) : (
          <DataTable
            value={categoryData}
            stripedRows
            responsiveLayout="scroll"
            paginator={categoryData.length > 5}
            rows={5}
            style={{ marginTop: "1rem" }}
          >
            <Column field="category" header="Category" sortable />
            <Column field="regretCount" header="Regret Count" sortable />
            <Column field="totalCount" header="Total Expenses" sortable />
            <Column
              field="regretPercentage"
              header="Regret %"
              body={percentageTemplate}
              sortable
            />
          </DataTable>
        )}
      </Card>
    </div>
  );
};

export default CategoryRegret;
