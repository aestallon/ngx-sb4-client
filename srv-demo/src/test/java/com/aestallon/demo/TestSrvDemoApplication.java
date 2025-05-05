package com.aestallon.demo;

import org.springframework.boot.SpringApplication;

public class TestSrvDemoApplication {

  public static void main(String[] args) {
    SpringApplication.from(SrvDemoApplication::main).with(TestcontainersConfiguration.class)
      .run(args);
  }

}
