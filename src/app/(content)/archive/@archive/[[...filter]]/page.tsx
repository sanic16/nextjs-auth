import NewsList from "@/components/NewsList";
import Link from "next/link";
import React, { Suspense } from "react";
import { FaArrowLeft } from "react-icons/fa";
import {
  getAvailableNewsYears as newsYears,
  getAvailableNewsMonths as newsMonths,
  getNewsForYear as newsForYear,
  getNewsForYearAndMonth as newsForYearAndMonth,
} from "@/utils/db";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const FilteredHeader = async ({
  selectedYear,
  selectedMonth,
}: {
  selectedYear: number | undefined;
  selectedMonth: number | undefined;
}) => {
  let links = await newsYears();
  let back = "/archive";

  if (
    (selectedYear && !(await newsYears()).includes(selectedYear)) ||
    (selectedMonth &&
      selectedYear &&
      !(await newsMonths(selectedYear)).includes(selectedMonth))
  ) {
    throw new Error("Invalid filter.");
  }

  if (selectedYear && !selectedMonth) {
    // news = (await newsForYear(parseInt(selectedYear))).map((newsItem) => {
    //   return {
    //     id: newsItem.id.toString(),
    //     slug: newsItem.slug,
    //     title: newsItem.title,
    //     content: newsItem.content,
    //     date: newsItem.date.toString(),
    //     image: newsItem.image,
    //   };
    // });
    links = await newsMonths(selectedYear);
  }

  if (selectedYear && selectedMonth) {
    // news = (
    //   await newsForYearAndMonth(
    //     parseInt(selectedYear),
    //     parseInt(selectedMonth) - 1
    //   )
    // ).map((newsItem) => {
    //   return {
    //     id: newsItem.id.toString(),
    //     slug: newsItem.slug,
    //     title: newsItem.title,
    //     content: newsItem.content,
    //     image: newsItem.image,
    //     date: newsItem.date.toString(),
    //   };
    // });
    // links = [];
    back = `/archive/${selectedYear}`;
  }

  return (
    <>
      <Link
        href={back}
        style={{
          display: "inline-block",
          color: "#ff0",
          fontSize: "2rem",
          marginBottom: "1rem",
        }}
      >
        <FaArrowLeft />
      </Link>
      <header id="archive-header">
        <nav>
          <ul>
            {links.map((link) => {
              const href = selectedYear
                ? `/archive/${selectedYear}/${link}`
                : `/archive/${link}`;

              return (
                <li key={link}>
                  <Link href={href}>
                    {selectedYear ? months[link - 1] : link}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>
    </>
  );
};

const FilteredNews = async ({
  selectedYear,
  selectedMonth,
}: {
  selectedYear: number | undefined;
  selectedMonth: number | undefined;
}) => {
  let news;
  if (selectedYear && !selectedMonth) {
    news = news = (await newsForYear(selectedYear)).map((newsItem) => {
      return {
        id: newsItem.id.toString(),
        slug: newsItem.slug,
        title: newsItem.title,
        content: newsItem.content,
        date: newsItem.date.toString(),
        image: newsItem.image,
      };
    });
  } else if (selectedYear && selectedMonth) {
    news = (await newsForYearAndMonth(selectedYear, selectedMonth - 1)).map(
      (newsItem) => {
        return {
          id: newsItem.id.toString(),
          slug: newsItem.slug,
          title: newsItem.title,
          content: newsItem.content,
          image: newsItem.image,
          date: newsItem.date.toString(),
        };
      }
    );
  }

  let newsContent = <p>No news found for the selected period.</p>;

  if (news && news.length > 0) {
    newsContent = <NewsList news={news} />;
  }

  return newsContent;
};

export default async function FilteredNewsPage({
  params,
}: {
  params: {
    filter: string;
  };
}) {
  const filter = params.filter;

  const selectedYear = filter?.[0]; // equivalent to filter ? filter[0] : undefined
  const selectedMonth = filter?.[1];

  // let news: News[] = [];

  return (
    <>
      <Suspense fallback={<p>Loading filter...</p>}>
        <FilteredHeader
          selectedYear={selectedYear ? +selectedYear : undefined}
          selectedMonth={selectedMonth ? +selectedMonth : undefined}
        />
      </Suspense>
      <main>
        <Suspense fallback={<p>Loading news...</p>}>
          <FilteredNews
            selectedYear={selectedYear ? +selectedYear : undefined}
            selectedMonth={selectedMonth ? +selectedMonth : undefined}
          />
        </Suspense>
      </main>
    </>
  );
}
