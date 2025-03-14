"use client";

import { formatUpdateTime } from "@/app/lib/utils";
import { useEffect, useState } from "react";

export function UpdatedTime({ lastUpdated }: { lastUpdated: string | Date }) {
  const [timeAgo, setTimeAgo] = useState<string>("loading...");

  useEffect(() => {
    setTimeAgo(formatUpdateTime(lastUpdated));

    const interval = setInterval(() => {
      setTimeAgo(formatUpdateTime(lastUpdated));
    }, 60000);

    return () => clearInterval(interval);
  }, [lastUpdated]);

  return <h3 className="ml-2 text-sm text-gray-500">Updated {timeAgo}</h3>;
}
