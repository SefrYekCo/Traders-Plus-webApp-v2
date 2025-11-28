import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "./plan.module.css";

import { useCookies } from "react-cookie";
import { toast } from "react-toastify";

import { buyPlan } from "../../../api/planApi";
import {
  removeHtmlTag,
  numberWithCommas,
} from "../../../helpers/helperFunctions";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import withAuth from "../../../components/checkAuth/auth";
import Image from "next/image";
import loadingGif from "../../../public/image/loading.gif";
import Head from "next/head";
import { api, password } from "../../../api/api";
import { getUserByToken } from "../../../api/userApi";
import { getAllPlans } from "../../../api/planApi";

export async function getServerSideProps({ query }) {
  const Plan = await api().get(`/plan/${query.planId}`, {
    headers: { password: password },
  });
  const plan = Plan.data.response.plan;

  return {
    props: {
      plan,
    },
  };
}

const Plan = ({ plan }) => {

  const [loading, setLoading] = useState(false);
  const [cookies, setCookies, removeCookies] = useCookies(["token"]);
  const [userPlans, setUserPlans] = useState([]);
  const [plans, setPlans] = useState([]);
  const router = useRouter();
  const planId = router.query.planId;

  useEffect(() => {
    getUserByToken(cookies.token ,(isOk ,info) => {
      if(isOk){
        // console.log(info.response);
          setUserPlans(info.response.userInfo.plans)
          return
      }
      return toast.error(info.response.data.description)
    })

    getAllPlans((isOk ,info) => {
      if(isOk){
      // console.log(info.response);
      setPlans(info.response.plans)
      return
      }
      return toast.error(info.response.data.description)
    })
  } 
  ,[])

  const buyPlanHandler = (typeId) => {
    setLoading(true);

    let haveActivePlan = false
    userPlans.map(userPlan => {

      const userPlanData = plans.find(plan => userPlan.planId === plan._id)

      if(plan.type === userPlanData.type && Date.now() < new Date(userPlan.expireDate)) {
        setLoading(false);
        haveActivePlan = true
        return 
      }
    })

    if(haveActivePlan) return toast.warn("شما در حال حاضر اشتراک فعال دارید")

    const data = {
      planId: planId,
      typeId,
      platform: "web",
    };

    buyPlan(cookies.token, data, (isOk, info) => {
      if (isOk) {
        router.push(info.response.url);
        return setLoading(false);
      }
      setLoading(false);
      if (info.response.data.description)
        return toast.error(info.response.data.description);
      if (info.response.data.message)
        return toast.error(info.response.data.message);
      return toast.error("خطا در اجرای عملیات");
    });
  };

  return (
    <div className={styles.mainContainer}>
      <Head>
        <title>اشتراک {plan.name} | تریدرزپلاس </title>
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1"
        />
      </Head>
      <div className={styles.container}>
        <h2> {plan.name} </h2>
        <Typography className={styles.description}>
          {" "}
          {removeHtmlTag(plan.description)}{" "}
        </Typography>
        <div className={styles.typesContainer}>
          {plan.types &&
            plan.types.map((type) => {
              return (
                <Card key={type._id} className={styles.card}>
                  <CardContent className={styles.cardContent}>
                    {type.discount == 0 ? (
                      <Typography
                        sx={{ fontSize: 14, color: "green" }}
                        color="text.secondary"
                        gutterBottom
                      >
                        هزینه : {numberWithCommas(type.amount)} ریال
                      </Typography>
                    ) : (
                      <div>
                        <Typography
                          sx={{
                            fontSize: 14,
                            textDecorationLine: "line-through",
                            color: "#FF7276",
                          }}
                          color="text.secondary"
                          gutterBottom
                        >
                          هزینه : {type.amount} ریال
                        </Typography>
                        <Typography
                          sx={{ fontSize: 14, color: "green" }}
                          color="text.secondary"
                          gutterBottom
                        >
                          هزینه : {type.amount - type.discount} ریال
                        </Typography>
                      </div>
                    )}
                    <Typography variant="h5" component="div"></Typography>
                    {type.discount != 0 && (
                      <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        تخفیف : {type.discount} ریال
                      </Typography>
                    )}
                    <Typography variant="body2">
                      مدت پلن : {type.period} روز
                    </Typography>
                  </CardContent>
                  <CardActions>
                    {loading ? (
                      <Image src={loadingGif} width={20} height={20} />
                    ) : (
                      <Button
                        size="small"
                        onClick={() => buyPlanHandler(type._id)}
                      >
                        خریداری پلن
                      </Button>
                    )}
                  </CardActions>
                </Card>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default withAuth(Plan);
