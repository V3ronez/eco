/*
  Warnings:

  - You are about to drop the column `cancelAt` on the `Notification` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Notification" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "recepientId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "readAt" DATETIME,
    "canceledAt" DATETIME,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Notification" ("category", "content", "createAt", "id", "readAt", "recepientId") SELECT "category", "content", "createAt", "id", "readAt", "recepientId" FROM "Notification";
DROP TABLE "Notification";
ALTER TABLE "new_Notification" RENAME TO "Notification";
CREATE INDEX "Notification_recepientId_idx" ON "Notification"("recepientId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
