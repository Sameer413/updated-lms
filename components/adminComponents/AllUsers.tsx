"use client";
import { styles } from "@/app/styles/styles";
import { useGetAllUsersQuery } from "@/redux/features/users/userApi";
import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import { AiOutlineDelete, AiOutlineMail } from "react-icons/ai";
import { format } from "timeago.js";
import Loader from "../layout/Loader";

const AllUsers = ({ isTeam }: { isTeam?: boolean }) => {
  // const [active, setActive] = useState(false);

  const { data, isLoading } = useGetAllUsersQuery({});

  const columns = [
    { field: "id", headerName: "ID", flex: 0.3 },
    { field: "name", headerName: "Name", flex: 0.5 },
    { field: "email", headerName: "Email", flex: 0.5 },
    { field: "role", headerName: "Role", flex: 0.5 },
    { field: "courses", headerName: "Purchased Courses", flex: 0.5 },
    { field: "created_at", headerName: "Joined At", flex: 0.2 },
    {
      field: " ",
      headerName: "Delete",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <Button>
            <AiOutlineDelete className="text-white" size={20} />
          </Button>
        );
      },
    },
    // {
    //     field: "  ",
    //     headerName: "Email",
    //     flex: 0.2,
    //     renderCell: (params: any) => {
    //         return (
    //             <>
    //                 <a
    //                     href={`mailto:${params.row.email}`}
    //                 >
    //                     <AiOutlineMail
    //                         className='text-white'
    //                         size={20}
    //                     />
    //                 </a>
    //             </>
    //         );
    //     },
    // },
  ];

  const rows: any = [];

  if (isTeam) {
    const newData =
      data && data.users.filter((item: any) => item.role === "admin");

    newData?.forEach((item: any) => {
      rows.push({
        id: item._id,
        name: item.name,
        email: item.email,
        role: item.role,
        purchased: item.purchased,
        courses: item.courses.length,
        created_at: format(item.createdAt),
      });
    });
  } else {
    data?.users.forEach((item: any) => {
      rows.push({
        id: item._id,
        name: item.name,
        email: item.email,
        role: item.role,
        purchased: item.purchased,
        courses: item.courses.length,
        created_at: format(item.createdAt),
      });
    });
  }

  return isLoading ? (
    <Loader />
  ) : (
    <Box m={"20px"}>
      {/* <div className="w-full flex justify-end">
                <div
                    className={`${styles.button} !w-[220px] bg-[#57c7a3] !h-[35px] border border-[#ffffff6c]`}
                    onClick={() => setActive(!active)}
                >
                    Add New Member
                </div>
            </div> */}
      <Box
        m={"40px 0 0 0"}
        height={"80vh"}
        width={"auto"}
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
            outline: "none",
          },
          "& ..css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
            color: "#fff",
          },
          "& .MuiDataGrid-sortIcon": {
            color: "#000",
          },
          "& .MuiDataGrid-row": {
            color: "#fff",
            borderBottom: "1px solid #ffffff30!important",
          },
          "& .MuiTablePagination-root": {
            color: "#fff",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: "#000",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#3e4396",
            borderBottom: "none",
            color: "#000",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: "#1F2A40",
          },
          "& .MuiDataGrid-footerContainer": {
            color: "#fff",
            borderTop: "none",
            backgroundColor: "#3e4396",
          },
          "& .MuiCheckbox-root": {
            color: `#b7ebde !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `#fff !important`,
          },
        }}
      >
        <DataGrid checkboxSelection rows={rows} columns={columns} />
      </Box>
    </Box>
  );
};

export default AllUsers;
