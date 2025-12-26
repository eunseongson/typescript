import { Grid2, Typography } from "@mui/material";
import React from "react";
import useGetNewRelease from "../../../hooks/useGetNewRelease";
import Loading from "../../../common/components/Loading";
import ErrorMessage from "../../../common/components/ErrorMessage";
import Card from "./Card";

const NewReleases = () => {
  const { data, error, isLoading } = useGetNewRelease();
  if (error) {
    return <ErrorMessage errorMessage={error.message} />
  }
  if (isLoading) {
    return <Loading />
  }
  return (
    <div>
      <Typography variant="h1" fontWeight={700} marginBottom="16px">
        New Releases Albums
      </Typography>
      {data && data.albums.items.length > 0 ? <Grid2 container spacing={2}>
        {data.albums.items.map((album) => {
          return (
            <Grid2 size={{ xs: 6, sm: 4, md: 2 }} key={album.id}>
              <Card image={album.images[0].url} name={album.name} artistName={album.artists[0].name}></Card>
            </Grid2>
          )
        })}
      </Grid2> : <Typography variant="h2">No Data</Typography>}
    </div>
  );
};

export default NewReleases;
