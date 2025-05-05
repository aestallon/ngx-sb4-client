package com.aestallon.demo.controller;

import org.smartbit4all.api.view.ViewApi;
import org.smartbit4all.api.view.bean.View;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class LaunchController {

  private final ViewApi viewApi;

  @GetMapping("/api/launch")
  public ResponseEntity<Void> launch() {
    viewApi.showView(new View().viewName("home"));
    return ResponseEntity.ok().build();
  }

}
