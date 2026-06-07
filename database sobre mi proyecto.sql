-- Generado por Tecnopraxis — Diseñador de BD

CREATE TABLE `1. comunidad y liceo` (
  `pk_liceo_id` INT NOT NULL AUTO_INCREMENT,
  `Nombre_inst` VARCHAR(("José Antonio Abreu")),
  `ubicacion` VARCHAR(("Trujillo, edo. Trujillo")),
  `representantes` VARCHAR(("Lcda. Roxana Blanco")),
  `población beneficiada` VARCHAR(("Estudiante y Profesores")),
  PRIMARY KEY (`pk_liceo_id`)
);

CREATE TABLE `2. diagnostico tecnológico` (
  `pk_plan_id` INT NOT NULL,
  `fk_diagnostico_id` INT DEFAULT '(clave foreana )',
  `falla_infraestru` VARCHAR(("cebit sin cableado")),
  `efecto_negtv` VARCHAR((perdida_ del_Internet)),
  `estado actual` VARCHAR((critico,servidor)),
  PRIMARY KEY (`pk_plan_id`),
  UNIQUE KEY `uq_2. diagnostico tecnológico_fk_diagnostico_id` (`fk_diagnostico_id`)
);

CREATE TABLE `3.plan de acción` (
  `pk_plan_id` INT NOT NULL,
  `pk_diagnostico_id` INT NOT NULL,
  `1.diagnostico` VARCHAR((investgr)) NOT NULL DEFAULT '122',
  `2.diseño` VARCHAR((croquis cubicajes)),
  `3.instacion` VARCHAR((ponchado normal)),
  `4.verificacion` VARCHAR((marcha servidor)),
  PRIMARY KEY (`pk_plan_id`)
);

CREATE TABLE `4. infraestructura física` (
  `pk_infra_id` INT NOT NULL,
  `FK_plan_id` INT,
  `norma aplicacion` VARCHAR((ANSI/tía)),
  `topología física` VARCHAR((hacia rack)),
  `cable utp` VARCHAR((requerido sera donado)),
  `hardware activo` VARCHAR((switch configuración)),
  PRIMARY KEY (`pk_infra_id`),
  UNIQUE KEY `uq_4. infraestructura física_FK_plan_id` (`FK_plan_id`)
);

CREATE TABLE `5. servicio del servidor` (
  `pk_servidor_id` INT NOT NULL,
  `FK_infra_id` INT,
  `so,instalación` VARCHAR(("Linux libre)),
  `servicio red local` VARCHAR((centrar los datos)),
  `estructuras pruebas` VARCHAR((operativa / certificado)),
  PRIMARY KEY (`pk_servidor_id`)
);

ALTER TABLE `2. diagnostico tecnológico` ADD CONSTRAINT `fk_rel_37` FOREIGN KEY (`pk_plan_id`) REFERENCES `3.plan de acción` (`pk_plan_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE `4. infraestructura física` ADD CONSTRAINT `fk_rel_38` FOREIGN KEY (`pk_infra_id`) REFERENCES `5. servicio del servidor` (`pk_servidor_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE `1. comunidad y liceo` ADD CONSTRAINT `fk_rel_45` FOREIGN KEY (`pk_liceo_id`) REFERENCES `2. diagnostico tecnológico` (`fk_diagnostico_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE `3.plan de acción` ADD CONSTRAINT `fk_rel_51` FOREIGN KEY (`pk_diagnostico_id`) REFERENCES `4. infraestructura física` (`FK_plan_id`) ON DELETE RESTRICT ON UPDATE CASCADE;