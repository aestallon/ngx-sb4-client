package com.aestallon.demo.view;

import java.util.Collections;
import org.smartbit4all.api.object.bean.ObjectContainer;
import org.smartbit4all.api.view.PageApiImpl;
import org.smartbit4all.api.view.bean.View;
import org.springframework.stereotype.Component;

@Component
public class HomeViewImpl extends PageApiImpl<ObjectContainer> implements HomeView {

  public HomeViewImpl() {
    super(ObjectContainer.class);
  }

  @Override
  public ObjectContainer initModel(View view) {
    return new ObjectContainer().data(Collections.singletonMap("greeting", "Hello World!"));
  }

}
