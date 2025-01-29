import { expect } from "@playwright/test";
import { test } from "../pages/base";
// import { NavigateMenu } from "../pages/menu-navigation";
import { menuData } from "../test-data/menu";

test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.loginAsUser();
});

// test('ทดสอบดึงข้อมูลจาก API', async ({ request }) => {
//     // ดึงข้อมูลจาก API
//     const response = await request.post('https://core.humansoft.co.th/api-cache.php');
//     expect(response.ok()).toBeTruthy(); // ตรวจสอบว่า API ส่งสถานะ OK (2xx)

//     const data = await response.json(); // แปลง response เป็น JSON
//     console.log('ข้อมูลจาก API:', data);

//     const payload = data.playload;
//     console.log('payload --> ', payload)

//     const firstMenu = payload;  // เข้าถึง menu แรกใน payload
//     console.log('menu_id แรก:', firstMenu.menu_id);
//     // expect(firstMenu.menu_id).toBe('1580');  // ทดสอบ menu_id ว่าตรงกับค่าที่คาดหวัง

//     // ใช้ข้อมูลจาก API ในการทดสอบ
//     // expect(data.title).toBe('sunt aut facere repellat provident occaecati excepturi optio reprehenderit');
// });

// menuData.forEach(({ payload }) => {
//     payload.forEach(({ menu_name }, index) => {
//         const formattedIndex = String(index + 1).padStart(3, "0");
        
//         test.only(`TC_${formattedIndex}: Click menu dashboard`, async({ menuPage }) => {
//             await menuPage.clickCollapsable(menu_name); 
//             if (CHILD_MENUS && CHILD_MENUS.length > 0) {
//                 await menuPage.clickChildCollapsable(menu_name);  
//                 if (CHILD_MENUS && CHILD_MENUS.length > 0) {
//                     await menuPage.clickChildItem(menu_name);  
//                     await menuPage.clickDashboard();
//                     expect(await menuPage.getNewPageURL).toBe(/welcome/);
//                 }
//             }
//         });
//     })
// });

// menuData.forEach(({ payload }) => {
//     payload.forEach(({ menu_name, CHILD_MENUS }, index) => {
//         const formattedIndex = String(index + 1).padStart(3, "0");
//         test(`TC_${formattedIndex}: Click menu ${menu_name}`, async ({ menuPage }) => {
//             await menuPage.clickCollapsable(menu_name);

//             if (CHILD_MENUS && CHILD_MENUS.length > 0) {
//                 let i = 0;
//                 for (const childMenu of CHILD_MENUS) {
//                     i++;
//                     if (childMenu.CHILD_MENUS && childMenu.CHILD_MENUS.length > 0) {

//                         for (const subChildMenu of childMenu.CHILD_MENUS) {
//                             await menuPage.clickChildCollapsable(subChildMenu.menu_name);
//                             await menuPage.clickChildItem(subChildMenu.menu_name);
//                             const newPageURL = await menuPage.getNewPageURL(subChildMenu.link_url);
//                             console.log(`${i} child :${newPageURL}: ${subChildMenu.link_url} `)
//                             await expect(newPageURL).toMatch(subChildMenu.link_url);
//                         }
//                     } else if (childMenu.CHILD_MENUS === null) {
//                         await menuPage.clickChildItem(childMenu.menu_name);
//                         const newPageURL = await menuPage.getNewPageURL(childMenu.link_url);
//                         console.log(`${i} no child : ${newPageURL}: ${childMenu.link_url} `)
//                         await expect(newPageURL).toMatch(childMenu.link_url);
                       
//                     }
                    
//                 }
//             }
//         });
//     });
// });


menuData.forEach(({ payload }) => {
    payload.forEach(async ({ menu_name, CHILD_MENUS }, index) => {
        const formattedIndex = String(index + 1).padStart(3, "0");
        
       // test(`TC_${formattedIndex}: Click menu ${menu_name}`, async ({ menuPage }) => {
        
              // จะเลือกเมนูอะไร
        if (CHILD_MENUS && CHILD_MENUS.length > 0) {
            for (const childMenu of CHILD_MENUS) {
                let i = 0;
                if (childMenu.CHILD_MENUS && childMenu.CHILD_MENUS.length > 0) {
                    i++;
                    const number = String(i).padStart(3, "0");
                    for (const subChildMenu of childMenu.CHILD_MENUS) {
                        test(`TC_${formattedIndex}_${number}: Click menu ${menu_name}/${childMenu.menu_name}/${subChildMenu.menu_name}`, async ({ menuPage }) => {
                            await menuPage.clickCollapsable(menu_name);
                            await menuPage.clickChildCollapsable(subChildMenu.menu_name);
                            await menuPage.clickChildItem(subChildMenu.menu_name);
                            const newPageURL = await menuPage.getNewPageURL(subChildMenu.link_url);
                            await expect(newPageURL).toMatch(subChildMenu.link_url);
                        });
                        
                    }
                } else if (childMenu.CHILD_MENUS === null) {
               
                    test(`TC_${formattedIndex} Click menu ${menu_name}/${childMenu.menu_name}`, async ({ menuPage }) => {
                        await menuPage.clickCollapsable(menu_name);
                        await menuPage.clickChildItem(childMenu.menu_name);
                        const newPageURL = await menuPage.getNewPageURL(childMenu.link_url);
                        await expect(newPageURL).toMatch(childMenu.link_url);
                    });

                    
                }
        
                
            }
        }
            
       // });
    });
});