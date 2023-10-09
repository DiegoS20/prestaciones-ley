-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "lastName" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "admissionDate" DATE NOT NULL,
    "monthlyPayment" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
