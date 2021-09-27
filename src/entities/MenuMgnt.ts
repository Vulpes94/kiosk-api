import { ViewColumn, ViewEntity } from 'typeorm';

@ViewEntity({
  name: 'menu_mgnt',
  expression: `
    SELECT menu_slct.menu_name AS menu_name, menu_slct.menu_price AS menu_price,
      CAST((menu_slct.menu_stock + IFNULL(wishlist.wish_quantity, 0)) AS SIGNED INTEGER) AS menu_stock
    FROM (
      menu_slct
      LEFT JOIN (
        SELECT wishlist.menu_name AS menu_name, SUM(wishlist.wish_quantity) AS wish_quantity
        FROM kible.wishlist GROUP BY wishlist.menu_name
      ) AS wishlist
      ON menu_slct.menu_name = wishlist.menu_name
    );
  `,
})
export class MenuMgnt {
  @ViewColumn()
  menu_name!: string;

  @ViewColumn()
  menu_price!: number;

  @ViewColumn()
  menu_stock!: number;
}
