const {expect} = require("@playwright/test");

const menuData = [
    {
        payload: [
            {
                menu_name: "ข้อมูลของท่าน",
                link_url: null,
                CHILD_MENUS: [  
                    {
                        menu_name: "ภาพรวมของท่าน",  
                        link_url: "/profile/dashboard",
                        CHILD_MENUS: null
                    },
                    {
                        menu_name: "ข้อมูลส่วนตัว",  
                        link_url: "/profile/profile",
                        CHILD_MENUS: null
                    },
                    {
                        menu_name: "ยื่อเอกสาร",  
                        link_url: null,
                        CHILD_MENUS: [
                            {
                                menu_name: "ขอลางาน",
                                link_url: "/profile/documents/time-leave",
                                CHILD_MENUS: null,
                            },
                            {
                                menu_name: "ขอโอที",
                                link_url: "/profile/documents/ot",
                                CHILD_MENUS: null,
                            },
                            {
                                menu_name: "ขอเพิ่มเวลา",
                                link_url: "/profile/documents/time-adjust",
                                CHILD_MENUS: null,
                            },
                            {
                                menu_name: "ขอเปลี่ยนกะการทำงาน",
                                link_url: "/profile/documents/work-cycle",
                                CHILD_MENUS: null,
                            },
                            {
                                menu_name: "ขอเปลี่ยนวันหยุด",
                                link_url: "/profile/documents/holiday",
                                CHILD_MENUS: null,
                            },
                            {
                                menu_name: "ขอเบิกล่วงหน้า",
                                link_url: "/profile/documents/withdraw",
                                CHILD_MENUS: null,
                            },
                            {
                                menu_name: "ขอลาออก",
                                link_url: "/profile/documents/resign",
                                CHILD_MENUS: null,
                            },
                            {
                                menu_name: "ขอเอกสารรับรองเงินเดือน",
                                link_url: "/profile/documents/salary-doc",
                                CHILD_MENUS: null,
                            },
                            {
                                menu_name: "ขอเอกสารรับรองการทำงาน",
                                link_url: "/profile/documents/work-certificate",
                                CHILD_MENUS: null,
                            },
                            {
                                menu_name: "ขอเอกสารรับรองการขอวีซ่า",
                                link_url: "/profile/documents/visa",
                                CHILD_MENUS: null,
                            },
                        ]
                    },
                    {
                        menu_name: "ข้อมูลคำนวณเงิน",  
                        link_url: "/profile/salary/calculate",
                        CHILD_MENUS: null
                    },
                    {
                        menu_name: "สลิปเงินเดือน",  
                        link_url: "/profile/slip",
                        CHILD_MENUS: null
                    },
                    {
                        menu_name: "Todo-Lists",  
                        link_url: "/profile/slip",
                        CHILD_MENUS: null
                    },
                    {
                        menu_name: "วางแผนกะการทำงาน - วันหยุด",  
                        link_url: "/profile/workcycle-plan",
                        CHILD_MENUS: null
                    },
                    {
                        menu_name: "นโยบายบริษัท",  
                        link_url: "/profile/organization-policy",
                        CHILD_MENUS: null
                    },
                    {
                        menu_name: "ตอบแบบประเมิน",  
                        link_url: null,
                        CHILD_MENUS: [
                            {
                                menu_name: "ตอบแบบประเมินพนักงานทั่วไป",
                                link_url: "/profile/documents/time-leave",
                                CHILD_MENUS: null,
                            },
                            {
                                menu_name: "ตอบแบบประเมินพนักงานทดลอง",
                                link_url: "/my-assessment/assessment-probationary",
                                CHILD_MENUS: null,
                            }
                        ]
                    },
                    {
                        menu_name: "แหล่งเรียนรู้",  
                        link_url: null,
                        CHILD_MENUS: [
                            {
                                menu_name: "E-library (Beta)",
                                link_url: "/profile/e-library",
                                CHILD_MENUS: null,
                            },
                            {
                                menu_name: "E-learning (Beta)",
                                link_url: "/profile/e-learning",
                                CHILD_MENUS: null,
                            },
                        ],
                    },
                ],
            }
        ],
    },
];

module.exports = {
    menuData,
}