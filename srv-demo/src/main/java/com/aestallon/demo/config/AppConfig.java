package com.aestallon.demo.config;

import java.nio.file.Paths;
import java.util.Collection;
import java.util.Collections;
import org.smartbit4all.api.config.PlatformApiConfig;
import org.smartbit4all.api.org.OrgApi;
import org.smartbit4all.api.org.OrgApiStorageImpl;
import org.smartbit4all.api.session.SessionApi;
import org.smartbit4all.api.session.SessionManagementApi;
import org.smartbit4all.api.session.restserver.config.SessionSrvRestConfig;
import org.smartbit4all.api.view.restserver.config.ViewSrvRestConfig;
import org.smartbit4all.bff.api.config.PlatformBffApiConfig;
import org.smartbit4all.core.object.ObjectDefinitionApi;
import org.smartbit4all.domain.data.storage.ObjectStorage;
import org.smartbit4all.domain.data.storage.StorageApi;
import org.smartbit4all.sec.session.SessionApiImpl;
import org.smartbit4all.sec.session.SessionManagementApiImpl;
import org.smartbit4all.storage.fs.StorageFS;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingClass;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

@Configuration
@Import({
  PlatformApiConfig.class,
  ViewSrvRestConfig.class
})
public class AppConfig {

  @Bean
  ObjectStorage objectStorage(ObjectDefinitionApi objectDefinitionApi) {
    return new StorageFS(Paths.get("./fs").toFile(), objectDefinitionApi);
  }

  @Bean
  OrgApi orgApi(StorageApi storageApi) throws Exception {
    return new OrgApiStorageImpl(storageApi, Collections.emptyList());
  }

}
