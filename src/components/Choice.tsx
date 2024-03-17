/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/prefer-optional-chain */
import React, { useEffect, useState } from "react";

import Icon from "@mdi/react";
import { mdiLogout } from "@mdi/js";

import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Choice {
  id: number;
  name: string;
}

const Choice: React.FC = () => {
  const [choices, setChoices] = useState<Choice[]>([]);
  const [categoryIdList, setCategoryIdList] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(0); // New state to track current page
  const itemsPerPage = 6; // Could also be a prop if you want flexibility

  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/choice/route", {
        method: "POST",
        body: JSON.stringify({
          // pageNumber: 1,
        }),
      });

      if (response.ok) {
        response.json().then(async (data) => {
          console.log(data.res);
          setChoices(data.res as Choice[]);

          const userChoicesResponse = await fetch(
            `/api/userChoices/${localStorage.getItem("id")}/route`,
            {
              method: "GET",
            },
          );

          if (userChoicesResponse.ok) {
            const userChoicesData = await userChoicesResponse.json();
            console.log(userChoicesData.res);

            const categoryIdList = userChoicesData.res.map(
              (choice: { categoryId: any }) => choice.categoryId,
            );
            setCategoryIdList(categoryIdList);
            console.log(categoryIdList);

            // Process the userChoicesData as needed
          } else {
            console.error("Error fetching user choices:");
          }
        });
      } else {
        console.error("Error fetching data:");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleCheckboxChange = async (choiceId: number, isChecked: boolean) => {

    if (isChecked) {
      try {
        const response = await fetch("/api/userChoices/route", {
          method: "POST",
          body: JSON.stringify({
            id: localStorage.getItem("id"),
            categories: choiceId,
          }),
        });

        if (response.ok) {
          console.log("Choice updated successfully");
          setCategoryIdList([...categoryIdList, choiceId]);
          toast.success("Choice updated successfully");
        } else {
          console.error("Error updating choice:");
        }
      } catch (error) {
        console.error("Error updating choice:", error);
      }
    } else if (!isChecked) {
      try {
        const response = await fetch("/api/userChoices/route", {
          method: "DELETE",
          body: JSON.stringify({
            id: localStorage.getItem("id"),
            categories: choiceId,
          }),
        });

        if (response.ok) {
          console.log("Choice updated successfully");
          toast.success("Choice updated successfully");
          setCategoryIdList(categoryIdList.filter((id) => id !== choiceId));
        } else {
          console.error("Error updating choice:");
        }
      } catch (error) {
        console.error("Error updating choice:", error);
      }
    }
  };

  const logout = async () => {
    try {
      toast.success("Logged out successfully");
      localStorage.removeItem("isLoggedIn");
      router.push("/");
    } catch (error) {
      toast.error("Error logging out");
      console.error("Error logging out:", error);
    }
  };

  const handlePageClick = (newPage: number) => {
    setCurrentPage(newPage);
  };


  const pageCount = Math.ceil(choices.length / itemsPerPage);

  const handleFirstPage = () => {
    handlePageClick(0);
  };

  const handleLastPage = () => {
    handlePageClick(pageCount - 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage > 0 ? currentPage - 1 : 0);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage < pageCount - 1 ? currentPage + 1 : pageCount - 1);
  };

  const currentItems = choices.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  const pageNumbersToShow = 5; // Number of page numbers to show around the current page
  const pageNumbers = [];

  // Handle the case when there are fewer pages than the number of page numbers to show
  if (pageCount <= pageNumbersToShow) {
    for (let i = 0; i < pageCount; i++) {
      pageNumbers.push(i + 1);
    }
  } else {
    // Add the first page number
    pageNumbers.push(1);

    // Add the ellipsis if the current page is not in the first or last set of page numbers
    if (currentPage >= pageNumbersToShow - 1) {
      pageNumbers.push('...');
    }

    // Add the page numbers around the current page
    const startIndex = Math.max(2, currentPage - Math.floor(pageNumbersToShow / 2) + 1);
    const endIndex = Math.min(pageCount - 1, startIndex + pageNumbersToShow - 3);
    for (let i = startIndex; i <= endIndex; i++) {
      pageNumbers.push(i);
    }

    // Add the ellipsis if the current page is not in the last set of page numbers
    if (currentPage < pageCount - 2) {
      pageNumbers.push('...');
    }

    // Add the last page number if it's not already included
    if (pageNumbers[pageNumbers.length - 1] !== pageCount) {
      pageNumbers.push(pageCount);
    }
  }
  return (
    <>
      <div className="mr-4 mt-1 flex justify-end">
        <button onClick={logout}>
          <Icon
            path={mdiLogout}
            size={1.3}
            className="cursor-pointer rounded-full bg-gray-200 p-1 hover:bg-gray-300"
          />
        </button>
      </div>
      <div className=" mx-auto my-10 flex h-[658px] w-[576px] rounded-[20px] border border-[#C1C1C1]">
        <div className="justify-center -mt-28 ml-4 flex min-h-full flex-1 flex-col px-6 py-1 lg:px-8">

          <div className="sm:mx-auto">
            <h2 className="mt-10 mb-4 text-center text-[32px] font-[600] leading-9 tracking-tight text-gray-900">
              Please mark your interests!
            </h2>
          </div>

          <div className="mt-1 sm:mx-auto sm:w-full sm:max-w-sm">
            <p className="mt-1 text-center text-[16px] font-[400]">
              We will keep you notified
            </p>
          </div>
          <p className="mt-12 text-[20px] font-[500]">My saved interests!</p>
          <div className="checkboxes mt-4">
            {currentItems.map((choice) => (
              <div key={choice.id} className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id={`choice-${choice.id}`}
                  checked={categoryIdList.includes(choice.id)}
                  onChange={(e) => handleCheckboxChange(choice.id, e.target.checked)}
                  className="form-checkbox h-6 w-6 border-gray-300 rounded accent-black"
                />
                <label htmlFor={`choice-${choice.id}`} className="ml-2 text-lg">
                  {choice.name}
                </label>
              </div>
            ))}
          </div>
          <div className="flex justify-start mt-8 space-x-2">
            <button onClick={handleFirstPage} disabled={currentPage === 0} className="text-gray-500 text-xl px-2 py-1">&lt;&lt;</button>
            <button onClick={handlePreviousPage} disabled={currentPage === 0} className="text-gray-500 text-xl px-2 py-1">&lt;</button>
            {pageNumbers.map((number) => (
              <button
                key={number}
                onClick={() => handlePageClick(Number(number) - 1)}
                disabled={currentPage === Number(number) - 1}
                className={`text-xl px-2 py-1 ${
                  currentPage === Number(number) - 1 ? 'text-black' : 'text-gray-500'
                }`}
              >
                {number}
              </button>
            ))}
            <button onClick={handleNextPage} disabled={currentPage >= pageCount - 1} className="text-gray-500 text-xl px-2 py-1">&gt;</button>
            <button onClick={handleLastPage} disabled={currentPage >= pageCount - 1} className="text-gray-500 text-xl px-2 py-1">&gt;&gt;</button>
          </div>
        </div></div></>
  );
};

export default Choice;
