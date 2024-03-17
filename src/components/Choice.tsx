import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

import { toast } from "sonner";

interface Choice {
  id: number;
  name: string;
}

const Choice: React.FC = () => {
  const [choices, setChoices] = useState<Choice[]>([]);
  const [categoryIdList, setCategoryIdList] = useState<number[]>([]);
  console.log("choice", choices);

  function Items({ currentItems }: { currentItems: any[] }) {
    return (
      <>
        <div>
          {currentItems &&
            currentItems.map((choice) => (
              <div key={choice.id} className="flex mb-4 ">
                <input
                  type="checkbox"
                  id={`choice-${choice.id}`}
                  value={choice.id}
                  checked={categoryIdList.includes(choice.id)}
                  onChange={(event) =>
                    handleCheckboxChange(choice.id, event.target.checked)
                  }
                  className={categoryIdList.includes(choice.id) ? "accent-black h-6 w-6" : "accent-[#CCCCCC] h-6 w-6"}
                />
                <label
                  className=" text-[16px] font-[400] ml-4"
                  htmlFor={`choice-${choice.id}`}
                >
                  {choice.name}
                </label>
              </div>
            ))}
        </div>
      </>
    );
  }

  function PaginatedItems({ itemsPerPage }: { itemsPerPage: number }) {
    const [itemOffset, setItemOffset] = useState(0);

    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);

    const currentItems = choices.slice(itemOffset, endOffset);

    const pageCount = Math.ceil(choices.length / itemsPerPage);

    // Invoke when user click to request another page.
    const handlePageClick = (event: { selected: number }) => {
      const newOffset = (event.selected * itemsPerPage) % choices.length;
      console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`,
      );
      setItemOffset(newOffset);
    };

    return (
      <>
        <Items currentItems={currentItems} />
        <ReactPaginate
          breakLabel="..."
          nextLabel=" >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={7}
          pageCount={pageCount}
          previousLabel="< "
          renderOnZeroPageCount={null}
          marginPagesDisplayed={0}
        />
      </>
    );
  }

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
    console.log(choiceId, isChecked);

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

  return (
    <>
      <div className="mx-auto my-10 flex h-[658px] w-[576px] rounded-[20px] border border-[#C1C1C1]">
        <div className="justify-cente flex min-h-full flex-1 flex-col px-6 py-1 lg:px-8">
          <div className="sm:mx-auto">
            <h2 className="mt-10 text-center text-[32px] font-[600] leading-9 tracking-tight text-gray-900">
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
            <PaginatedItems itemsPerPage={6} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Choice;
