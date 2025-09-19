/*
  Warnings:

  - You are about to drop the column `data` on the `carts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."carts" DROP COLUMN "data";

-- CreateTable
CREATE TABLE "public"."product_in_carts" (
    "product_id" TEXT NOT NULL,
    "cart_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "product_in_carts_pkey" PRIMARY KEY ("product_id","cart_id")
);

-- AddForeignKey
ALTER TABLE "public"."carts" ADD CONSTRAINT "carts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."product_in_carts" ADD CONSTRAINT "product_in_carts_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."product_in_carts" ADD CONSTRAINT "product_in_carts_cart_id_fkey" FOREIGN KEY ("cart_id") REFERENCES "public"."carts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
