/*
  Warnings:

  - You are about to drop the column `communityAvatar` on the `Invitation` table. All the data in the column will be lost.
  - You are about to drop the column `communityName` on the `Invitation` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Invitation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "communityId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "accepted" BOOLEAN NOT NULL DEFAULT false,
    "declined" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Invitation_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "Community" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Invitation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Invitation" ("accepted", "communityId", "createdAt", "declined", "id", "updatedAt", "userId") SELECT "accepted", "communityId", "createdAt", "declined", "id", "updatedAt", "userId" FROM "Invitation";
DROP TABLE "Invitation";
ALTER TABLE "new_Invitation" RENAME TO "Invitation";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
