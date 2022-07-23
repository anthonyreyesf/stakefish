import { Button, Empty, Space, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IExchangeData } from "../Root";

export default function Exchanges() {
  const [topExchangesData, setTopExchangesData] = useState<IExchangeData[]>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopExchangesData = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/exchanges?per_page=10&page=1"
        );
        const exchanges = await response.json();

        return setTopExchangesData(exchanges);
      } catch (error) {
        throw error;
      }
    };

    fetchTopExchangesData();
  }, []);

  const columns: ColumnsType<IExchangeData> = [
    {
      title: "Logo",
      dataIndex: "image",
      key: "image",
      render: (_, record) => <img src={record.image} alt={record.image} />,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_, record) => <p>{record.name || "-"}</p>,
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
      render: (_, record) => <p>{record.country || "-"}</p>,
    },
    {
      title: "Trust Rank",
      key: "trust_score_rank",
      dataIndex: "trust_score_rank",
      render: (_, record) => <p>{record.trust_score_rank || "-"}</p>,
    },
    {
      title: "Website",
      key: "website",
      render: (_, record) => (
        <Space size="middle">
          <a href={record.url} target="_blank" rel="noreferrer">
            Visit {record.name}'s website
          </a>
        </Space>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            onClick={() => {
              navigate(`/${record.id}`);
            }}
          >
            More info
          </Button>
        </Space>
      ),
    },
  ];

  if (!topExchangesData) return <Empty />;
  return (
    <Table
      rowKey="name"
      columns={columns}
      dataSource={topExchangesData}
      pagination={false}
    />
  );
}
