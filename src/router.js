//import vue router
import { createRouter, createWebHistory } from 'vue-router'
//define a routes
const routes = [
    {
        path: '/',
        name: 'beranda',
        component: () => import('@/components/DashboardLayout.vue'),
        children: [
            {
                path: "/member",
                name: "member.index",
                component: () =>
                    import('@/view/Member/indexPage.vue'),
            },
            {
                path: "/member/create",
                name: "member.create",
                component: () =>
                    import('@/view/Member/createPage.vue'),
            },
            {
                path: "/member/edit:ID_MEMBER",
                name: "member.edit",
                component: () => 
                    import("@/view/Member/editPage.vue"),
            },
            {
                path: "/instructor",
                name: "instructor.index",
                component: () =>
                    import('@/view/Instructor/indexPage.vue'),
            },
            {
                path: "/instructor/create",
                name: "instructor.create",
                component: () =>
                    import('@/view/Instructor/createPage.vue'),
            },
            {
                path: "/instructor/edit:ID_INSTRUCTOR",
                name: "instructor.edit",
                component: () => 
                    import("@/view/Instructor/editPage.vue"),
            },
            {
                path: "/instructor_absent",
                name: "instructor_absent.index",
                component: () =>
                    import('@/view/InstructorAbsent/indexPage.vue'),
            },
            {
                path: "/classonrunning",
                name: "classonrunning.index",
                component: () =>
                    import('@/view/ClassOnRunning/indexPage.vue'),
            },
            {
                path: "/classonrunning/create",
                name: "classonrunning.create",
                component: () =>
                    import('@/view/ClassOnRunning/createPage.vue'),
            },
            {
                path: "/classonrunning/edit:ID_CLASS_ON_RUNNING",
                name: "classonrunning.edit",
                component: () => 
                    import("@/view/ClassOnRunning/editPage.vue"),
            },
            {
                path: "/classonrunningdaily",
                name: "classonrunningdaily.index",
                component: () =>
                    import("@/view/ClassOnRunningDaily/indexPage.vue"),
            },
            {
                path: "/classonrunnindaily/edit:ID_CLASS_ON_RUNNING_DAILY",
                name: "classonrunningdaily.edit",
                component: () => 
                    import("@/view/ClassOnRunningDaily/editPage.vue"),
            },
            {
                path: "/classdeposit",
                name: "classdeposit.index",
                component: () =>
                    import('@/view/ClassDeposit/indexPage.vue'),
            },
            {
                path: "/classbooking",
                name: "classbooking.index",
                component: () =>
                    import('@/view/ClassBooking/indexPage.vue'),
            },
            {
                path: "/gymbooking",
                name: "gymbooking.index",
                component: () =>
                    import('@/view/GymBooking/indexPage.vue'),
            },
            {
                path: "/gymbooking/create",
                name: "gymbooking.create",
                component: () =>
                    import('@/view/GymBooking/createPage.vue'),
            },
            {
                path: "/aktivasitahunan",
                name: "aktivasitahunan.index",
                component: () => 
                    import("@/view/AktivasiTahunan/indexPage.vue"),
            },
            {
                path: "/aktivasitahunan/create",
                name: "aktivasitahunan.create",
                component: () => 
                    import("@/view/AktivasiTahunan/createPage.vue"),
            },
            {
                path: "/depositregularhistory",
                name: "depositregularhistory.index",
                component: () => 
                    import("@/view/DepositRegularHistory/indexPage.vue"),
            },
            {
                path: "/depositregularhistory/create",
                name: "depositregularhistory.create",
                component: () => 
                    import("@/view/DepositRegularHistory/createPage.vue"),
            },
            {
                path: "/depositclasshistory",
                name: "depositclasshistory.index",
                component: () => 
                    import("@/view/DepositClassHistory/indexPage.vue"),
            },
            {
                path: "/ReportAktivasiClass",
                name: "ReportAktivasiKelas.index",
                component: () => 
                    import("@/view/Report/aktivitasClassPage.vue"),
            },
            {
                path: "/ReportAktivasiGym",
                name: "ReportAktivasiGym.index",
                component: () => 
                    import("@/view/Report/aktivitasGymPage.vue"),
            },
            {
                path: "/ReportKinerjaInstruktur",
                name: "ReportKinerjaInstruktur.index",
                component: () => 
                    import("@/view/Report/kinerjaInstrukturPage.vue"),
            },
            {
                path: "/ReportPendapatanBulanan",
                name: "ReportPendapatanBulanan.index",
                component: () => 
                    import("@/view/Report/pendapatanBulananPage.vue"),
            }
        ],
    },
]
//create router
const router = createRouter({
    history: createWebHistory(),
    routes // config routes
})
export default router;