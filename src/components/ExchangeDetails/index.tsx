import { Button, Empty, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IExchangeData } from "../Root";

export default function ExchangeDetails() {
  const [exchangeData, setExchangeData] = useState<IExchangeData>();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchExchangesData = async () => {
      const exchangeParam = location.pathname.slice(1);
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/exchanges/${exchangeParam}`
        );
        const exchanges = await response.json();

        return setExchangeData(exchanges);
      } catch (error) {
        throw error;
      }
    };

    fetchExchangesData();
  }, [location.pathname]);

  if (!exchangeData) return <Empty />;
  return (
    <>
      <img src={exchangeData.image} alt={exchangeData.image} />
      <Typography.Title>{exchangeData.name}</Typography.Title>
      <Typography.Paragraph>
        {`Description: ${exchangeData.description || "-"}`}
      </Typography.Paragraph>
      <Typography.Paragraph>
        {`Country: ${exchangeData.country || "-"}`}
      </Typography.Paragraph>
      <Typography.Paragraph>
        {`Trust rank: ${exchangeData.trust_score_rank || "-"}`}
      </Typography.Paragraph>
      <Typography.Paragraph>
        {`Year of establishment: ${exchangeData.year_established || "-"}`}
      </Typography.Paragraph>
      <Typography.Paragraph>
        {`Twitter: ${
          `https://twitter.com/${exchangeData.twitter_handle}` || "-"
        }`}
      </Typography.Paragraph>
      <Typography.Paragraph>
        Facebook:{" "}
        {exchangeData.facebook_url ? (
          <Typography.Link
            href={exchangeData.facebook_url}
            target="_blank"
            rel="noreferrer"
          >
            {exchangeData.facebook_url}
          </Typography.Link>
        ) : (
          "-"
        )}
      </Typography.Paragraph>
      <Typography.Paragraph>
        Reddit:{" "}
        {exchangeData.reddit_url ? (
          <Typography.Link
            href={exchangeData.reddit_url}
            target="_blank"
            rel="noreferrer"
          >
            {exchangeData.reddit_url}
          </Typography.Link>
        ) : (
          "-"
        )}
      </Typography.Paragraph>
      <Typography.Paragraph>
        Slack:{" "}
        {exchangeData.slack_url ? (
          <Typography.Link
            href={exchangeData.slack_url}
            target="_blank"
            rel="noreferrer"
          >
            {exchangeData.slack_url}
          </Typography.Link>
        ) : (
          "-"
        )}
      </Typography.Paragraph>
      <Button onClick={() => navigate("/")}>Back</Button>
    </>
  );
}
