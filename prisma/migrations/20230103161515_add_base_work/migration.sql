-- CreateTable
CREATE TABLE "Work" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "titleEn" TEXT NOT NULL DEFAULT '',
    "titleUa" TEXT NOT NULL DEFAULT '',
    "thumbnailId" UUID NOT NULL,

    CONSTRAINT "Work_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkCategory" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "textEn" VARCHAR(255) NOT NULL DEFAULT '',
    "textUa" VARCHAR(255) NOT NULL DEFAULT '',
    "workId" UUID NOT NULL,

    CONSTRAINT "WorkCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Illustration" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "src" TEXT NOT NULL,
    "originalWidth" INTEGER NOT NULL,
    "originalHeight" INTEGER NOT NULL,

    CONSTRAINT "Illustration_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Work_thumbnailId_key" ON "Work"("thumbnailId");

-- AddForeignKey
ALTER TABLE "Work" ADD CONSTRAINT "Work_thumbnailId_fkey" FOREIGN KEY ("thumbnailId") REFERENCES "Illustration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkCategory" ADD CONSTRAINT "WorkCategory_workId_fkey" FOREIGN KEY ("workId") REFERENCES "Work"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
