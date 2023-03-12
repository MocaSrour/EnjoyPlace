import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
  Button,
  Text,
} from "@chakra-ui/react";
import ReactStars from "react-rating-stars-component";
import { GrFormEdit } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

function BoxReview({ review, edit }) {
  const navigate = useNavigate();

  return (
    <Stack boxShadow= "0px 2px 20px #444" spacing="4" mb="20px" w="100%">
      <Card variant="elevated">
        <CardHeader py="0">
          <Heading display="flex" alignItems="center" justifyContent="flex-start" size="md" h="50px">
            {review.user.userName} &bull;
            <Box>
              <ReactStars edit={false} value={review.rate} />
            </Box>{" "}
            &bull;
            {edit && (
              <Button
                backgroundColor="transparent"
                m="0"
                mx="10px"
                p="1"
                borderRadius={"50%"}
                onClick={(e) => navigate("/edit", { state: {review} })}
              >
                <GrFormEdit size="xs"/>
              </Button>
            )}
          </Heading>
        </CardHeader>
        <CardBody pt="2" pb="4">
          <Text>{review.comment}</Text>
        </CardBody>
      </Card>
    </Stack>
  );
}

export default BoxReview;
