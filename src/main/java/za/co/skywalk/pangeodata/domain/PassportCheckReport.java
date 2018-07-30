package za.co.skywalk.pangeodata.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.util.Objects;

/**
 * A PassportCheckReport.
 */
@Document(collection = "passport_check_report")
public class PassportCheckReport implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("passport_verified")
    private String passportVerified;

    @Field("document_authenticity_verified_by")
    private String documentAuthenticityVerifiedBy;

    @Field("document_authenticity_verified_date")
    private String documentAuthenticityVerifiedDate;

    @Field("document_authenticity_remarks")
    private String documentAuthenticityRemarks;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPassportVerified() {
        return passportVerified;
    }

    public PassportCheckReport passportVerified(String passportVerified) {
        this.passportVerified = passportVerified;
        return this;
    }

    public void setPassportVerified(String passportVerified) {
        this.passportVerified = passportVerified;
    }

    public String getDocumentAuthenticityVerifiedBy() {
        return documentAuthenticityVerifiedBy;
    }

    public PassportCheckReport documentAuthenticityVerifiedBy(String documentAuthenticityVerifiedBy) {
        this.documentAuthenticityVerifiedBy = documentAuthenticityVerifiedBy;
        return this;
    }

    public void setDocumentAuthenticityVerifiedBy(String documentAuthenticityVerifiedBy) {
        this.documentAuthenticityVerifiedBy = documentAuthenticityVerifiedBy;
    }

    public String getDocumentAuthenticityVerifiedDate() {
        return documentAuthenticityVerifiedDate;
    }

    public PassportCheckReport documentAuthenticityVerifiedDate(String documentAuthenticityVerifiedDate) {
        this.documentAuthenticityVerifiedDate = documentAuthenticityVerifiedDate;
        return this;
    }

    public void setDocumentAuthenticityVerifiedDate(String documentAuthenticityVerifiedDate) {
        this.documentAuthenticityVerifiedDate = documentAuthenticityVerifiedDate;
    }

    public String getDocumentAuthenticityRemarks() {
        return documentAuthenticityRemarks;
    }

    public PassportCheckReport documentAuthenticityRemarks(String documentAuthenticityRemarks) {
        this.documentAuthenticityRemarks = documentAuthenticityRemarks;
        return this;
    }

    public void setDocumentAuthenticityRemarks(String documentAuthenticityRemarks) {
        this.documentAuthenticityRemarks = documentAuthenticityRemarks;
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
        PassportCheckReport passportCheckReport = (PassportCheckReport) o;
        if (passportCheckReport.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), passportCheckReport.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PassportCheckReport{" +
            "id=" + getId() +
            ", passportVerified='" + getPassportVerified() + "'" +
            ", documentAuthenticityVerifiedBy='" + getDocumentAuthenticityVerifiedBy() + "'" +
            ", documentAuthenticityVerifiedDate='" + getDocumentAuthenticityVerifiedDate() + "'" +
            ", documentAuthenticityRemarks='" + getDocumentAuthenticityRemarks() + "'" +
            "}";
    }
}
