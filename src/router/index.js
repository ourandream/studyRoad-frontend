import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/login/Login.vue";
import TeaHome from "../views/teacher/home";
import TeaMain from "../components/home/teaMain";
import TeaInfo from "../components/teacher/Info";
import StuMain from "../components/home/stuMain";
import ChangePa from "../components/common/changepa";
import StuManage from "../components/teacher/stulist";
import StuDetail from "../components/teacher/studetail";
import ModifyStu from "../components/teacher/modifystu";
import StuAdd from "../components/teacher/stuadd";
import SetPermi from "../components/teacher/setpermi";
import StuHome from "../views/student/home";
import StuInfo from "../components/student/stuinfo";
import ModifyPa from "../components/student/modifypa";
import DeAppraisal from "../components/student/deappraisal";
import Idrology from "../components/student/submit/idrology";
import ExIdrology from "../components/student/examine/exidrology";
import PerAchievement from "../components/student/perachievement";
import Scientific from "../components/student/submit/scientific";
import Competition from "../components/student/submit/competition";
import Paper from "../components/student/submit/paper";
import Otherach from "../components/student/submit/otherach";
import Science from "../components/student/examine/science";
import Artother from "../components/student/submit/artother";
import Artjoin from "../components/student/submit/artjoin";
import Arthonor from "../components/student/submit/arthonor";
import Post from "../components/student/submit/post";
import Practicehonor from "../components/student/submit/practicehonor";
import Practiceother from "../components/student/submit/practiceother";
import Artsport from "../components/student/examine/artsport";
import Practice from "../components/student/examine/practice";
import TakeOffice from "../components/student/detail/takeoffice";
import DeductPoints from "../components/student/deductpoints";
import ComQuality from "../components/student/comquality";
import ManReviewed from "../components/student/management/manreviewed";
import ManUnreviewed from "../components/student/management/manunreviewed";
import ScoreEntry from "../components/teacher/scoremanage/scoreentry";
import ScoreDetail from "../components/teacher/scoremanage/scoredetail";
import ReducePoint from "../components/teacher/reducepointmanage/reducepoint";
import DeductList from "../components/teacher/reducepointmanage/deductlist";
import DaiShenhe from "../components/teacher/shenhemanage/daishenhe";
import YiShenhe from "../components/teacher/shenhemanage/yishenhe";
import Evaluation from "../components/teacher/comprehensive/evaluation";
import ZhDetail from "../components/teacher/comprehensive/zhdetail";
import Erro from "../views/errPage/404";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/404",
    name: "Erro",
    component: Erro,
  },
  {
    path: "/TeaHome",
    name: "TeaHome",
    component: TeaHome,
    children: [
      {
        path: "",
        name: TeaMain,
        component: TeaMain,
      },
      {
        path: "/TeaInfo",
        name: TeaInfo,
        component: TeaInfo,
      },
      {
        path: "/changePa",
        name: "ChangePa",
        component: ChangePa,
      },
      {
        path: "/stuManage",
        name: "stuManage",
        component: StuManage,
      },
      {
        path: "/stuDetail",
        name: "stuDetail",
        component: StuDetail,
      },
      {
        path: "/modifyStu",
        name: "ModifyStu",
        component: ModifyStu,
      },
      {
        path: "/stuAdd",
        name: "StuAdd",
        component: StuAdd,
      },
      {
        path: "/setPermi",
        name: "SetPermi",
        component: SetPermi,
      },
      {
        path: "/scoreentry",
        name: "ScoreEntry",
        component: ScoreEntry,
      },

      {
        path: "/scoredetail",
        name: "ScoreDetail",
        component: ScoreDetail,
      },
      {
        path: "/reducepoint",
        name: "ReducePoint",
        component: ReducePoint,
      },
      {
        path: "/deductlist",
        name: "DeductList",
        component: DeductList,
      },
      {
        path: "/daishenhe",
        name: "DaiShenhe",
        component: DaiShenhe,
      },
      {
        path: "/yishenhe",
        name: "YiShenhe",
        component: YiShenhe,
      },
      {
        path: "/evaluation",
        name: "Evaluation",
        component: Evaluation,
      },
      {
        path: "/zhdetail",
        name: "ZhDetail",
        component: ZhDetail,
      },
    ],
  },

  {
    path: "/StuHome",
    name: "StuHome",
    component: StuHome,
    children: [
      {
        path: "",
        name: "StuMain",
        component: StuMain,
      },
      {
        path: "/stuInfo",
        name: "StuInfo",
        component: StuInfo,
      },
      {
        path: "/modifyPa",
        name: "ModifyPa",
        component: ModifyPa,
      },
      {
        path: "/deAppraisal",
        name: "DeAppraisal",
        component: DeAppraisal,
      },
      {
        path: "/idrology",
        name: "Idrology",
        component: Idrology,
      },
      {
        path: "/exidrology",
        name: "ExIdrology",
        component: ExIdrology,
      },
      {
        path: "/perachievement",
        name: "PerAchievement",
        component: PerAchievement,
      },
      {
        path: "/scientific",
        name: "Scientific",
        component: Scientific,
      },
      {
        path: "/competition",
        name: "Competition",
        component: Competition,
      },
      {
        path: "/paper",
        name: "Paper",
        component: Paper,
      },
      {
        path: "/otherach",
        name: "Otherach",
        component: Otherach,
      },
      {
        path: "/science",
        name: "Science",
        component: Science,
      },
      {
        path: "/artother",
        name: "Artother",
        component: Artother,
      },
      {
        path: "/artjoin",
        name: "Artjoin",
        component: Artjoin,
      },
      {
        path: "/arthonor",
        name: "Arthonor",
        component: Arthonor,
      },
      {
        path: "/post",
        name: "Post",
        component: Post,
      },
      {
        path: "/practicehonor",
        name: "Practicehonor",
        component: Practicehonor,
      },
      {
        path: "/practiceother",
        name: "Practiceother",
        component: Practiceother,
      },

      {
        path: "/artsport",
        name: "Artsport",
        component: Artsport,
      },
      {
        path: "/practice",
        name: "Practice",
        component: Practice,
      },
      {
        path: "/takeoffice",
        name: "TakeOffice",
        component: TakeOffice,
      },
      {
        path: "/deductpointse",
        name: "DeductPoints",
        component: DeductPoints,
      },

      {
        path: "/comquality",
        name: "ComQuality",
        component: ComQuality,
      },

      {
        path: "/manunreviewed",
        name: "ManUnreviewed",
        component: ManUnreviewed,
      },
      {
        path: "/manreviewed",
        name: "ManReviewed",
        component: ManReviewed,
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
