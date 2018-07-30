package za.co.skywalk.pangeodata.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.util.Objects;

/**
 * A LocalLanguageMediaCheckReport.
 */
@Document(collection = "local_language_media_check_report")
public class LocalLanguageMediaCheckReport implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("local_language_media_findings")
    private String localLanguageMediaFindings;

    @Field("local_language_media_status")
    private String localLanguageMediaStatus;

    @Field("local_language_media_verified_date")
    private String localLanguageMediaVerifiedDate;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getLocalLanguageMediaFindings() {
        return localLanguageMediaFindings;
    }

    public LocalLanguageMediaCheckReport localLanguageMediaFindings(String localLanguageMediaFindings) {
        this.localLanguageMediaFindings = localLanguageMediaFindings;
        return this;
    }

    public void setLocalLanguageMediaFindings(String localLanguageMediaFindings) {
        this.localLanguageMediaFindings = localLanguageMediaFindings;
    }

    public String getLocalLanguageMediaStatus() {
        return localLanguageMediaStatus;
    }

    public LocalLanguageMediaCheckReport localLanguageMediaStatus(String localLanguageMediaStatus) {
        this.localLanguageMediaStatus = localLanguageMediaStatus;
        return this;
    }

    public void setLocalLanguageMediaStatus(String localLanguageMediaStatus) {
        this.localLanguageMediaStatus = localLanguageMediaStatus;
    }

    public String getLocalLanguageMediaVerifiedDate() {
        return localLanguageMediaVerifiedDate;
    }

    public LocalLanguageMediaCheckReport localLanguageMediaVerifiedDate(String localLanguageMediaVerifiedDate) {
        this.localLanguageMediaVerifiedDate = localLanguageMediaVerifiedDate;
        return this;
    }

    public void setLocalLanguageMediaVerifiedDate(String localLanguageMediaVerifiedDate) {
        this.localLanguageMediaVerifiedDate = localLanguageMediaVerifiedDate;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        LocalLanguageMediaCheckReport localLanguageMediaCheckReport = (LocalLanguageMediaCheckReport) o;
        if (localLanguageMediaCheckReport.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), localLanguageMediaCheckReport.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "LocalLanguageMediaCheckReport{" +
            "id=" + getId() +
            ", localLanguageMediaFindings='" + getLocalLanguageMediaFindings() + "'" +
            ", localLanguageMediaStatus='" + getLocalLanguageMediaStatus() + "'" +
            ", localLanguageMediaVerifiedDate='" + getLocalLanguageMediaVerifiedDate() + "'" +
            "}";
    }
}
