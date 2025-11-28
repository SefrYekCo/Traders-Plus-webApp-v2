import React from "react";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import styles from "./plans.module.css";

import { api } from "../../api/api";
import { useRouter } from "next/router";
import { removeHtmlTag, truncate } from "../../helpers/helperFunctions";

import Image from "next/image";
import noItem from "../../public/image/noItem.png";
import withAuth from "../../components/checkAuth/auth";

export async function getServerSideProps() {
  const Plans = await api().get("/plan/getAll");
  const plans = Plans.data.response.plans;

  return {
    props: {
      plans,
    },
  };
}

function Plans({ plans }) {
  const router = useRouter();

  const clickHandler = (id) => {
    router.push(`/plans/plan/${id}`);
  };

  if (plans.length == 0) {
    return (
      <div className={styles.noPlan}>
        <Image src={noItem} width={300} height={300} />
        <h1>اشتراکی وجود ندارد</h1>
      </div>
    );
  }

  return (
    <div className={styles.mainContainer}>
      {plans.map((plan) => {
        if (plan.type !== "public") {
          return (
            <Card key={plan._id} className={styles.card}>
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  {plan.name}
                </Typography>
                <Typography variant="h5" component="div"></Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {plan.type}
                </Typography>
                <Typography>
                  {removeHtmlTag(truncate(plan.description, 100))}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => clickHandler(plan._id)}>
                  {" "}
                  مشاهده پلن{" "}
                </Button>
              </CardActions>
            </Card>
          );
        }
      })}
    </div>
  );
}

Plans.title = " تریدرزپلاس | اشتراک ها ";

export default withAuth(Plans);
