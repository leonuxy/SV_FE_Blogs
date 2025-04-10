"use client"

import { useEffect, useState } from "react";
import { Posts, Columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Home() {
  const [data, setData] = useState<Posts[]>([]);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("");
  const limit = 10;
  const router = useRouter();

  
  const fetchData = async (page: number,filter : string="") => {
    try {
      const response = await axios.get(`http://localhost:8080/article/pagination/${limit}/${((page-1)*limit)}?filter=${filter}`);
      setData(response.data);
      console.log(response.data)
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    fetchData(page,filter);
  }, [page,filter]);

  const handleDetails = async (id: number) => {
    router.push(`./edit/${id}`);
  };
  const handleDelete = async (id: number) => {
    // 1. Find the selected data
    const selected = data.find((item) => item.id === id);
  
    if (!selected) return console.error("Item not found");
  
    // 2. Clone and modify the data (e.g., soft delete by updating `status`)
    const updatedData = { ...selected, status: "thrash" };
  
    try {
      // 3. Send the modified data to backend
      await axios.put(
        `http://localhost:8080/article/${id}`,
        updatedData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      // 4. Refresh the data after update
      fetchData(page);
    } catch (error) {
      console.error("Failed to update article:", error);
    }
  };
  
  // Call Columns with handlers and store the result in the columns variable
  const columns = Columns({
    handleDetails,
    handleDelete,
  });
  const handleNext = () => setPage((prev) => prev + 1);
  const handlePrev = () => setPage((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="grid items-center justify-items-center sm:p-20 font-[family-name:var(--font-geist-sans)]">
       <div className="flex justify-between items-center w-full max-w-[1080px] mb-6">
          <h2 className="text-2xl font-semibold">All Posts</h2>
          <button
            onClick={() => router.push("/create")}
            className="bg-black text-white px-3 py-2 rounded hover:bg-gray-800 transition"
          >
            + Add New
          </button>
        </div>
        <Tabs value={filter} onValueChange={(value) => {setFilter(value);console.log(value)}} className="w-[400px]">
          <TabsList>
            <TabsTrigger value="Publish">Published</TabsTrigger>
            <TabsTrigger value="Draft">Drafts</TabsTrigger>
            <TabsTrigger value="Thrash">Trashed</TabsTrigger>
          </TabsList>

          <TabsContent value="Publish">
            <DataTable columns={columns} data={data} />
            <div className="flex gap-4 justify-center mt-4">
              <button onClick={handlePrev} className="px-4 py-2 bg-gray-200">Previous</button>
              <span>Page {page}</span>
              <button onClick={handleNext} className="px-4 py-2 bg-gray-200">Next</button>
            </div>
          </TabsContent>

          <TabsContent value="Draft">
            <DataTable columns={columns} data={data} />
            <div className="flex gap-4 justify-center mt-4">
              <button onClick={handlePrev} className="px-4 py-2 bg-gray-200">Previous</button>
              <span>Page {page}</span>
              <button onClick={handleNext} className="px-4 py-2 bg-gray-200">Next</button>
            </div></TabsContent>

          <TabsContent value="Thrash">
            <DataTable columns={columns} data={data} />
            <div className="flex gap-4 justify-center mt-4">
              <button onClick={handlePrev} className="px-4 py-2 bg-gray-200">Previous</button>
              <span>Page {page}</span>
              <button onClick={handleNext} className="px-4 py-2 bg-gray-200">Next</button>
            </div></TabsContent>
        </Tabs>
    </div>
  );
}
