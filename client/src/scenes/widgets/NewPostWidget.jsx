import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Dropzone from "react-dropzone";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFeed } from "state";

const NewPostWidget = ({ picturePath }) => {
  const dispatch = useDispatch();
  // to open up dropzone to drop an image
  const [imageDropzone, setImageDropzone] = useState(false);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState();
  const { palette } = useTheme();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;

  //   handles the new post and makes API call
  const handlePost = async () => {
    // passing an image, formData used
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("description", post);
    // if there is an image
    if (image) {
      // append the image to formData to be uploaded to db
      formData.append("picture", image);
      // append the image name to formData as well
      formData.append("picturePath", image.name);
    }

    // send new post information to back-end
    const response = await fetch(`http://localhost:3001/posts`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    // back-end returns a lists of posts data
    const data = await response.json();
    // keep the list of posts
    dispatch(setFeed({ posts: data.reverse() }));
    // reset states after API call
    setImage(null);
    setPost("");
  };

  return (
    <WidgetWrapper>
      <FlexBetween gap="1.5rem">
        <UserImage image={picturePath} />
        <InputBase
          placeholder="What's on your mind..."
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
      </FlexBetween>
      {imageDropzone && (
        <Box
          border={`1px solid ${medium}`}
          borderRadius="5px"
          mt="1rem"
          p="1rem"
        >
          {/* dropzone, allows to pass files and also has validation */}
          <Dropzone
            // accepted file extensions
            acceptedFiles=".jpg,.jpeg,.png"
            // only one file is accepted
            multiple={false}
            onDrop={(acceptedFiles) =>
              // set the text form field value to "picture" manually
              setImage(acceptedFiles[0])
            }
          >
            {/* passing values for prop use in the jsx */}
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  // passing the props into the div
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p="1rem"
                  width="100%"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {/* if there is not picture value  */}
                  {!image ? (
                    // display this text
                    <p>Add Image Here</p>
                  ) : (
                    // show the name of the image that has been added
                    <FlexBetween>
                      <Typography>{image.name}</Typography>
                      {/* allows for change image to be uploaded */}
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {image && (
                  // add a trash icon to allow removal of image to be posted
                  <IconButton
                    onClick={() => setImage(null)}
                    sx={{ width: "15%" }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}
      <Divider sx={{ margin: "1.25rem 0" }} />
      <FlexBetween>
        <FlexBetween
          gap="0.25rem"
          // open and close image dropzone
          onClick={() => setImageDropzone(!imageDropzone)}
        >
          <ImageOutlined sx={{ color: mediumMain }} />
          <Typography
            color={mediumMain}
            sx={{ "&:hover": { cursor: "pointer", color: medium } }}
          >
            Image
          </Typography>
        </FlexBetween>
        {isNonMobileScreens ? (
          <>
            <FlexBetween gap="0.25rem">
              <GifBoxOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Clip</Typography>
            </FlexBetween>
            <FlexBetween gap="0.25rem">
              <AttachFileOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Attachment</Typography>
            </FlexBetween>
            <FlexBetween gap="0.25rem">
              <MicOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Audio</Typography>
            </FlexBetween>
          </>
        ) : (
          <FlexBetween gap="0.25rem">
            <MoreHorizOutlined sx={{ color: mediumMain }} />
          </FlexBetween>
        )}

        <Button
          disabled={!post}
          onClick={handlePost}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
          }}
        >
          POST
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default NewPostWidget;
