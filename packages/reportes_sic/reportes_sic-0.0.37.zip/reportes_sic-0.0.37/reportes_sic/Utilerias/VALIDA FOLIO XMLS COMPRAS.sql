CREATE OR ALTER TRIGGER CFD_RECIBIDOS_BI0 FOR CFD_RECIBIDOS
ACTIVE BEFORE INSERT OR UPDATE POSITION 0
AS
declare variable folio_cm_full varchar(15000);
declare variable folio_cm varchar(15000);
declare variable folio_xml varchar(15000);
declare variable serie_cm varchar(3);
declare variable serie_xml varchar(3);
begin
  select folio_prov from doctos_cm dc where dc.docto_cm_id = new.docto_id into :folio_cm_full;
  select substring(cast(new.xml as varchar(32000)) from (position('folio="' in new.xml) + 7) for ((position('" fecha=' in new.xml)) - (position('folio="' in new.xml) + 7))) from rdb$database into :folio_xml;
  select substring(cast(new.xml as varchar(32000)) from (position('serie="' in new.xml) + 7) for ((position('" folio=' in new.xml)) - (position('serie="' in new.xml) + 7))) from rdb$database into :serie_xml;

  select substring(:folio_cm_full from 1 for (char_length(:serie_xml))) from rdb$database into :serie_cm;
  select substring(:folio_cm_full from (1+(char_length(:serie_xml))) for (char_length(:folio_cm_full))) from rdb$database into :folio_cm;

/*  exception ex_ajuste_no_prom serie_cm ||'-'|| serie_xml ||'f'|| cast(cast(folio_cm as integer) as varchar(9)) ||'-'||folio_xml;*/
  if ((serie_cm || cast(cast(folio_cm as integer) as varchar(9))) <> (serie_xml || folio_xml)) then
  begin
      exception ex_alta_prohibida 'El folio del XML no coincide con el del documento.';
  end
end