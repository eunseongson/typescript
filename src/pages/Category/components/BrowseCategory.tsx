import React from "react";
import useGetSeveralBrowseCategories from "../../../hooks/useGetSeveralBrowseCategories";
import { Box, styled } from "@mui/material";
import CategoryCard from "./CategoryCard";

const ContentBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  gap: '15px',
  marginTop: '20px',
  [theme.breakpoints.down('sm')]: {
    gap: '10px',
    marginTop: '10px',
    justifyContent: 'center',
  },
}))
const BrowseCategory = () => {
  const { data, isLoading, error } = useGetSeveralBrowseCategories({
    limit: 10,
    offset: 0,
  })

  return (
    <ContentBox>
      {data?.categories.items.map((item) => {
        return <CategoryCard key={item.id} {...item} />
      })}
    </ContentBox>
  )
};

export default BrowseCategory;
