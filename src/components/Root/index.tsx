import { Typography } from "antd";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ExchangeDetails from "../ExchangeDetails";
import Exchanges from "../Exchanges";

export interface IExchangeData {
  country: string;
  description: string;
  has_trading_incentive: boolean;
  id: string;
  image: string;
  name: string;
  trade_volume_24h_btc: number;
  trade_volume_24h_btc_normalized: number;
  trust_score: number;
  trust_score_rank: number;
  url: string;
  year_established: number | null;
  twitter_handle: string;
  facebook_url: string;
  reddit_url: string;
  slack_url: string;
}

export default function Home() {
  return (
    <div style={{ width: "80%", maxWidth: "1200px", margin: "0 auto" }}>
      <div>
        <Typography.Title style={{ margin: 0 }}>
          Stakefish assessment
        </Typography.Title>
        <Typography.Title
          level={4}
          style={{ marginTop: 0, marginBottom: "30px" }}
        >
          by Anthony Reyes
        </Typography.Title>
      </div>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Exchanges />} />
          <Route path="/:exchange" element={<ExchangeDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
